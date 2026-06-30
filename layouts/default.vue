<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <LayoutAppHeader />
    <main class="flex-1 pb-16 sm:pb-0">
      <slot />
    </main>
    <LayoutAppFooter />
    <LayoutMobileBottomNav />
  </div>
</template>
