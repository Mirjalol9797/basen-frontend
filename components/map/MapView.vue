<template>
  <div ref="mapEl" class="w-full h-full" />
</template>

<script setup lang="ts">
import type { Map as LMap, Marker as LMarker } from 'leaflet'
import type { Pool } from '~/types/pool'

const props = defineProps<{
  pools: Pool[]
  activePoolId: string | null
}>()

const emit = defineEmits<{
  'pool-click': [pool: Pool]
}>()

const mapEl = ref<HTMLElement | null>(null)
let map: LMap | null = null
const markers: Record<string, LMarker> = {}

const COLORS: Record<string, string> = {
  open:     '#0EA5E9',
  indoor:   '#0284C7',
  children: '#06B6D4',
  sport:    '#0369A1',
  hotel:    '#0891B2',
  aquapark: '#F97316',
}

function pinIcon(L: typeof import('leaflet'), color: string) {
  return L.divIcon({
    html: `<svg width="28" height="36" viewBox="0 0 28 36" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 0C6.268 0 0 6.268 0 14c0 9.3 14 22 14 22s14-12.7 14-22C28 6.268 21.732 0 14 0z"
        fill="${color}" stroke="white" stroke-width="2"/>
      <circle cx="14" cy="14" r="5" fill="white"/>
    </svg>`,
    className: '',
    iconSize: [28, 36],
    iconAnchor: [14, 36],
    popupAnchor: [0, -38],
  })
}

function popupHtml(pool: Pool): string {
  const price = minPrice(pool.prices)
  const open = isOpenNow(pool.schedule)
  const statusDot = open
    ? '<span style="display:inline-block;width:6px;height:6px;background:#10B981;border-radius:50%;margin-right:4px"></span>'
    : '<span style="display:inline-block;width:6px;height:6px;background:#9CA3AF;border-radius:50%;margin-right:4px"></span>'
  const statusText = open ? 'Открыто' : 'Закрыто'

  return `<div style="font-family:Inter,system-ui,sans-serif;padding:12px;min-width:200px;max-width:240px">
    <div style="font-weight:700;font-size:14px;color:#111827;margin-bottom:3px;line-height:1.3">${pool.name}</div>
    <div style="font-size:11px;color:#6B7280;margin-bottom:8px;line-height:1.4">${pool.address}</div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
      <div style="display:flex;align-items:center;font-size:11px;color:#374151">${statusDot}${statusText}</div>
      <div style="font-size:12px;color:#374151;font-weight:500">от ${formatPrice(price)}</div>
    </div>
    <a href="/catalog/${pool.slug}"
      style="display:block;text-align:center;padding:7px 12px;background:#0284C7;color:white;border-radius:8px;font-size:12px;font-weight:600;text-decoration:none;transition:background .15s"
      onmouseover="this.style.background='#0369A1'"
      onmouseout="this.style.background='#0284C7'"
    >Подробнее →</a>
  </div>`
}

onMounted(async () => {
  if (!mapEl.value) return

  const L = (await import('leaflet')).default

  map = L.map(mapEl.value, {
    center: [41.3, 63.9],
    zoom: 6,
    zoomControl: false,
  })

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
    maxZoom: 19,
  }).addTo(map)

  L.control.zoom({ position: 'topright' }).addTo(map)

  props.pools.forEach(pool => {
    const color = COLORS[pool.category] ?? COLORS.indoor
    const marker = L.marker([pool.coordinates.lat, pool.coordinates.lng], {
      icon: pinIcon(L, color),
    })
    marker.bindPopup(popupHtml(pool), { className: 'basen-popup', maxWidth: 260 })
    marker.on('click', () => emit('pool-click', pool))
    marker.addTo(map!)
    markers[pool.id] = marker
  })
})

watch(() => props.activePoolId, (id) => {
  if (!map || !id || !markers[id]) return
  map.flyTo(markers[id].getLatLng(), 15, { animate: true, duration: 0.6 })
  setTimeout(() => markers[id]?.openPopup(), 700)
})

watch(() => props.pools, (newPools, oldPools) => {
  if (!map) return
  const oldIds = new Set(oldPools.map(p => p.id))
  const newIds = new Set(newPools.map(p => p.id))

  oldPools.forEach(pool => {
    if (!newIds.has(pool.id) && markers[pool.id]) {
      markers[pool.id].remove()
      delete markers[pool.id]
    }
  })

  newPools.forEach(async pool => {
    if (!oldIds.has(pool.id) && !markers[pool.id]) {
      const L = (await import('leaflet')).default
      const color = COLORS[pool.category] ?? COLORS.indoor
      const marker = L.marker([pool.coordinates.lat, pool.coordinates.lng], {
        icon: pinIcon(L, color),
      })
      marker.bindPopup(popupHtml(pool), { className: 'basen-popup', maxWidth: 260 })
      marker.on('click', () => emit('pool-click', pool))
      marker.addTo(map!)
      markers[pool.id] = marker
    }
  })
}, { deep: false })

onUnmounted(() => {
  map?.remove()
  map = null
})
</script>
