import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import * as XLSX from 'xlsx'

const __dirname = dirname(fileURLToPath(import.meta.url))
const pools = JSON.parse(readFileSync(join(__dirname, '../data/pools.json'), 'utf-8'))

const DAYS = { mon: 'Пн', tue: 'Вт', wed: 'Ср', thu: 'Чт', fri: 'Пт', sat: 'Сб', sun: 'Вс' }

const CATEGORIES = {
  open: 'Открытый',
  indoor: 'Крытый',
  children: 'Детский',
  sport: 'Спортивный',
  hotel: 'При отеле',
  aquapark: 'Аквапарк',
}

const SERVICES = {
  parking: 'Парковка',
  cafe: 'Кафе/ресторан',
  children_zone: 'Детская зона',
  locker_room: 'Раздевалка',
  shower: 'Душ',
  sauna: 'Сауна',
  instructor: 'Инструктор',
  rental: 'Прокат инвентаря',
  wifi: 'Wi-Fi',
  towel: 'Полотенце',
  medical: 'Медпункт',
  lifeguard: 'Спасатель',
}

const PRICE_KEYS = {
  'price.adult_single': 'Взрослый разовый',
  'price.child_single': 'Детский разовый',
  'price.adult_monthly': 'Взрослый абонемент (мес)',
  'price.child_monthly': 'Детский абонемент (мес)',
  'price.vip': 'VIP/Кабина',
  'price.group': 'Групповое занятие',
  'price.morning': 'Утренний',
  'price.evening': 'Вечерний',
  'price.swimlane': 'Дорожка',
}

function formatSchedule(schedule) {
  if (!schedule || schedule.length === 0) return ''
  return schedule.map(s => {
    if (s.closed) return `${DAYS[s.day] ?? s.day}: Закрыто`
    return `${DAYS[s.day] ?? s.day}: ${s.open}–${s.close}`
  }).join(', ')
}

function formatPrices(prices) {
  if (!prices || prices.length === 0) return ''
  return prices.map(p => {
    const label = PRICE_KEYS[p.key] ?? p.key
    if (p.amount === 0) return `${label}: Бесплатно`
    return `${label}: ${p.amount.toLocaleString('ru')} ${p.currency}`
  }).join(' | ')
}

const rows = pools.map(p => ({
  'ID (slug)':           p.slug,
  'Название (RU)':       p.translations?.ru?.name ?? '',
  'Название (UZ)':       p.translations?.uz?.name ?? '',
  'Категория':           CATEGORIES[p.category] ?? p.category,
  'Сезон':               p.season === 'summer' ? 'Летний' : 'Круглогодичный',
  'Регион':              p.region ?? '',
  'Район':               p.district ?? '',
  'Адрес (RU)':          p.translations?.ru?.address ?? '',
  'Телефон':             (p.phone ?? []).join(', '),
  'Telegram':            p.telegram ?? '',
  'Сайт':                p.website ?? '',
  'Широта (lat)':        p.coordinates?.lat ?? '',
  'Долгота (lng)':       p.coordinates?.lng ?? '',
  'Цены':                formatPrices(p.prices),
  'Расписание':          formatSchedule(p.schedule),
  'Услуги':              (p.services ?? []).map(s => SERVICES[s] ?? s).join(', '),
  'Длина бассейна (м)':  p.poolLength ?? '',
  'Глубина мин (м)':     p.poolDepthMin ?? '',
  'Глубина макс (м)':    p.poolDepthMax ?? '',
  'Рейтинг':             p.rating ?? '',
  'Отзывов':             p.reviewCount ?? '',
  'Топ':                 p.featured ? 'Да' : '',
  'Описание (RU)':       p.translations?.ru?.description ?? '',
}))

const wb = XLSX.utils.book_new()
const ws = XLSX.utils.json_to_sheet(rows)

// Column widths
ws['!cols'] = [
  { wch: 28 }, // slug
  { wch: 32 }, // name ru
  { wch: 32 }, // name uz
  { wch: 16 }, // category
  { wch: 16 }, // season
  { wch: 18 }, // region
  { wch: 18 }, // district
  { wch: 45 }, // address
  { wch: 18 }, // phone
  { wch: 28 }, // telegram
  { wch: 28 }, // website
  { wch: 12 }, // lat
  { wch: 12 }, // lng
  { wch: 55 }, // prices
  { wch: 55 }, // schedule
  { wch: 45 }, // services
  { wch: 12 }, // pool length
  { wch: 12 }, // depth min
  { wch: 12 }, // depth max
  { wch: 8  }, // rating
  { wch: 8  }, // reviews
  { wch: 6  }, // featured
  { wch: 80 }, // description
]

XLSX.utils.book_append_sheet(wb, ws, 'Бассейны')

const outPath = join(__dirname, '../pools-export.xlsx')
XLSX.writeFile(wb, outPath)
console.log(`✓ Экспортировано ${rows.length} бассейнов → pools-export.xlsx`)
