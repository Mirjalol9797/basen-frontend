<template>
  <div class="bg-white rounded-2xl shadow-card overflow-hidden">

    <!-- Image skeleton -->
    <AppSkeleton variant="rect" class="aspect-[4/3] w-full rounded-none" />

    <!-- Content -->
    <div class="p-4">

      <!-- Name -->
      <AppSkeleton variant="text" class="w-4/5 mb-1" />
      <AppSkeleton variant="text" class="w-2/3 mb-3" />

      <!-- Rating + status row -->
      <div class="flex items-center justify-between mb-2">
        <AppSkeleton variant="rect" width="100px" height="16px" />
        <AppSkeleton variant="rect" width="72px" height="16px" />
      </div>

      <!-- District -->
      <AppSkeleton variant="text" class="w-1/3 mb-3" />

      <!-- Price row -->
      <div class="flex items-center justify-between pt-2 border-t border-gray-50">
        <AppSkeleton variant="rect" width="110px" height="22px" />
        <AppSkeleton variant="rect" width="80px" height="22px" rounded="rounded-full" />
      </div>
    </div>
  </div>
</template>
