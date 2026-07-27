# Деплой и настройка сервера

Сайт — статика (`npm run generate`), заливается GitHub Actions по SSH
в `/var/www/basen.uz` на сервер Hetzner. Раздаёт nginx.

## Зачем нужен `nginx.conf`

> Применено на сервере 27.07.2026, проверено. `deploy/nginx.conf` — копия
> того, что сейчас лежит в `/etc/nginx/sites-available/basen.uz`.
> Резервная копия старого конфига: `/root/basen.uz.nginx.bak`.

Google Search Console показывал, что страницы не индексируются. Причина —
конфигурация nginx, а не код сайта:

| Было | Стало |
|---|---|
| `/catalog/x` → **301** на `/catalog/x/` | `/catalog/x` → **200** сразу |
| `/catalog/x/` → 200, но canonical ведёт на `/catalog/x` | `/catalog/x/` → 301 на `/catalog/x` |
| `www.basen.uz` → 200 (дубль всего сайта) | → 301 на `basen.uz` |
| несуществующий URL → главная с кодом **200** | → настоящий **404** |

Все URL в sitemap, `<link rel="canonical">` и `hreflang` записаны **без
завершающего слэша** — конфиг приведён к этой же форме.

Ключевая строка, из-за которой был лишний редирект:

```nginx
# было — "$uri/" заставляет nginx делать 301 с добавлением слэша
try_files $uri $uri/ /index.html;

# стало
try_files $uri $uri.html $uri/index.html =404;
```

## Как применить (если конфиг придётся накатывать заново)

Конфиг НЕ деплоится автоматически — GitHub Actions заливает только статику.
На сервере, под root:

```bash
# 1. Сохранить текущий конфиг
cp /etc/nginx/sites-available/basen.uz /root/basen.uz.nginx.bak

# 2. Сверить пути к SSL-сертификатам с теми, что в deploy/nginx.conf
grep -n "ssl_certificate\|server_name\|root" /etc/nginx/sites-available/basen.uz
```

Если пути отличаются от `/etc/letsencrypt/live/basen.uz/` — поправьте их
в конфиге, затем скопируйте содержимое `deploy/nginx.conf` и вставьте одной
командой (кавычки вокруг `'EOF'` обязательны, иначе `$uri` подставится пустым):

```bash
# 3. Записать конфиг
cat > /etc/nginx/sites-available/basen.uz <<'EOF'
...содержимое deploy/nginx.conf...
EOF

# 4. Проверить синтаксис — БЕЗ этого шага не перезагружать
nginx -t

# 5. Применить
systemctl reload nginx
```

Если что-то пошло не так:

```bash
sudo cp /root/basen.uz.nginx.bak /etc/nginx/sites-available/basen.uz
sudo nginx -t && sudo systemctl reload nginx
```

## Как проверить, что помогло

Локально, после перезагрузки nginx:

```bash
# Должно быть 200 (было 301)
curl -s -o /dev/null -w "%{http_code}\n" https://basen.uz/catalog/malibu-sun-club
curl -s -o /dev/null -w "%{http_code}\n" https://basen.uz/region/tashkent-region
curl -s -o /dev/null -w "%{http_code}\n" https://basen.uz/uz/catalog/malibu-sun-club

# Должно быть 301 на версию без слэша
curl -s -o /dev/null -w "%{http_code} → %{redirect_url}\n" https://basen.uz/catalog/malibu-sun-club/

# Должно быть 301 на basen.uz
curl -s -o /dev/null -w "%{http_code} → %{redirect_url}\n" https://www.basen.uz/

# Должно быть 404 (было 200 с главной страницей)
curl -s -o /dev/null -w "%{http_code}\n" https://basen.uz/takoy-stranicy-net

# Главная — 200
curl -s -o /dev/null -w "%{http_code}\n" https://basen.uz/
```

Ожидаемый результат: `200 200 200`, `301 → …/malibu-sun-club`,
`301 → https://basen.uz/`, `404`, `200`. Именно это и получено 27.07.2026.

## После применения — в Search Console

1. Проверка URL → вставить `https://basen.uz/catalog/malibu-sun-club` →
   «Проверить страницу на сайте». Должно быть «URL доступен для Google»
   без пометки о переадресации.
2. Запросить индексирование для 3–5 ключевых страниц вручную.
3. Sitemap → удалить и заново добавить `sitemap_index.xml`, чтобы Google
   перечитал его.
4. Отчёт «Индексирование страниц» обновляется медленно — реальный эффект
   виден через 1–3 недели. Раньше выводов не делать.
