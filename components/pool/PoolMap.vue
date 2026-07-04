<template>
  <div ref="mapEl" class="w-full h-56" />
</template>

<script setup lang="ts">
declare const ymaps: any

const props = defineProps<{
  lat: number
  lng: number
  name: string
}>()

const config = useRuntimeConfig()
const mapEl = ref<HTMLElement | null>(null)
let map: any = null

onMounted(async () => {
  if (!mapEl.value) return
  await loadYandexMaps(config.public.yandexMapsKey)

  map = new ymaps.Map(mapEl.value, {
    center: [props.lat, props.lng],
    zoom: 15,
    controls: ['zoomControl'],
  })

  const pm = new ymaps.Placemark(
    [props.lat, props.lng],
    { hintContent: props.name },
    {
      preset: 'islands#blueDotIcon',
    }
  )
  map.geoObjects.add(pm)
})

onUnmounted(() => {
  map?.destroy()
  map = null
})
</script>
