export const useSearch = (query: Ref<string>) => {
  const store = usePoolsStore()
  const q = computed(() => query.value.toLowerCase().trim())

  return computed(() =>
    q.value.length < 2
      ? []
      : store.all.filter(p =>
          p.name.toLowerCase().includes(q.value) ||
          p.address.toLowerCase().includes(q.value) ||
          p.description.toLowerCase().includes(q.value)
        )
  )
}
