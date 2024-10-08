<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
  <header>
    <NavigationBar />
  </header>

  <main>
    <Suspense>
      <template #default>
        <RouterView />
      </template>

      <template #fallback>
        <div class="flex items-center justify-center h-screen">
          <Icon icon="svg-spinners:blocks-wave" class="h-1/2 w-1/2" />
        </div>
      </template>
    </Suspense>

    <Toaster />
  </main>
</template>

<style scoped></style>
