<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <AppHeader />
    <main class="flex-1 pb-16 sm:pb-0">
      <slot />
    </main>
    <AppFooter />
    <MobileBottomNav />
  </div>
</template>
