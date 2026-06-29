export const useUiStore = defineStore('ui', () => {
  const isFilterDrawerOpen = ref(false)
  const isMapView = ref(false)

  function openFilterDrawer() { isFilterDrawerOpen.value = true }
  function closeFilterDrawer() { isFilterDrawerOpen.value = false }
  function toggleMapView() { isMapView.value = !isMapView.value }

  return {
    isFilterDrawerOpen,
    isMapView,
    openFilterDrawer,
    closeFilterDrawer,
    toggleMapView,
  }
})
