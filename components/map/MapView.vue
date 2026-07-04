<template>
  <div ref="mapEl" class="w-full h-full" />
</template>

<script setup lang="ts">
import type { Pool } from '~/types/pool'

declare const ymaps: any

const props = defineProps<{
  pools: Pool[]
  activePoolId: string | null
}>()

const emit = defineEmits<{
  'pool-click': [pool: Pool]
}>()

const config = useRuntimeConfig()
const mapEl = ref<HTMLElement | null>(null)
let map: any = null
const placemarks: Record<string, any> = {}

const COLORS: Record<string, string> = {
  open:     '#0EA5E9',
  indoor:   '#0284C7',
  children: '#06B6D4',
  sport:    '#0369A1',
  hotel:    '#0891B2',
  aquapark: '#F97316',
}

function pinDataUrl(color: string): string {
  const svg = `<svg width="28" height="36" viewBox="0 0 28 36" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 0C6.268 0 0 6.268 0 14c0 9.3 14 22 14 22s14-12.7 14-22C28 6.268 21.732 0 14 0z" fill="${color}" stroke="white" stroke-width="2"/>
    <circle cx="14" cy="14" r="5" fill="white"/>
  </svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

function balloonHtml(pool: Pool): string {
  const price = minPrice(pool.prices)
  const open = isOpenNow(pool.schedule)
  const dot = open
    ? '<span style="display:inline-block;width:6px;height:6px;background:#10B981;border-radius:50%;margin-right:4px;vertical-align:middle"></span>'
    : '<span style="display:inline-block;width:6px;height:6px;background:#9CA3AF;border-radius:50%;margin-right:4px;vertical-align:middle"></span>'

  return `<div style="font-family:Inter,system-ui,sans-serif;padding:4px 2px;min-width:200px;max-width:240px">
    <div style="font-weight:700;font-size:14px;color:#111827;margin-bottom:3px;line-height:1.3">${pool.name}</div>
    <div style="font-size:11px;color:#6B7280;margin-bottom:8px;line-height:1.4">${pool.address}</div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
      <div style="font-size:11px;color:#374151">${dot}${open ? 'Открыто' : 'Закрыто'}</div>
      <div style="font-size:12px;color:#374151;font-weight:500">от ${formatPrice(price)}</div>
    </div>
    <a href="/catalog/${pool.slug}" style="display:block;text-align:center;padding:7px 12px;background:#0284C7;color:white;border-radius:8px;font-size:12px;font-weight:600;text-decoration:none">Подробнее →</a>
  </div>`
}

function addMarker(pool: Pool) {
  if (!map) return
  const color = COLORS[pool.category] ?? COLORS.indoor
  const pm = new ymaps.Placemark(
    [pool.coordinates.lat, pool.coordinates.lng],
    { balloonContent: balloonHtml(pool), hintContent: pool.name },
    {
      iconLayout: 'default#image',
      iconImageHref: pinDataUrl(color),
      iconImageSize: [28, 36],
      iconImageOffset: [-14, -36],
      balloonCloseButton: true,
      hideIconOnBalloonOpen: false,
    }
  )
  pm.events.add('click', () => emit('pool-click', pool))
  map.geoObjects.add(pm)
  placemarks[pool.id] = pm
}

onMounted(async () => {
  if (!mapEl.value) return
  await loadYandexMaps(config.public.yandexMapsKey)

  map = new ymaps.Map(mapEl.value, {
    center: [41.3, 63.9],
    zoom: 6,
    controls: ['zoomControl', 'fullscreenControl'],
  })

  props.pools.forEach(addMarker)
})

watch(() => props.activePoolId, (id) => {
  if (!map || !id || !placemarks[id]) return
  const coords = placemarks[id].geometry.getCoordinates()
  map.setCenter(coords, 15, { checkZoomRange: true, duration: 300 })
  setTimeout(() => placemarks[id].balloon.open(), 400)
})

watch(() => props.pools, (newPools, oldPools) => {
  if (!map) return
  const oldIds = new Set(oldPools.map(p => p.id))
  const newIds = new Set(newPools.map(p => p.id))

  oldPools.forEach(pool => {
    if (!newIds.has(pool.id) && placemarks[pool.id]) {
      map.geoObjects.remove(placemarks[pool.id])
      delete placemarks[pool.id]
    }
  })

  newPools.forEach(pool => {
    if (!oldIds.has(pool.id) && !placemarks[pool.id]) addMarker(pool)
  })
}, { deep: false })

onUnmounted(() => {
  map?.destroy()
  map = null
})
</script>
