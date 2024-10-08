<script setup lang="ts">
import { Icon } from '@iconify/vue'
const pb = usePocketBase()
const fps = useFps()

const map = await pb.collection('maps').getOne('3dcnacg5httj51c')
const maps = await pb.collection('maps').getFullList()
console.table(maps)
const map1 = maps[1]
console.table(map1)
const url = ref(`http://localhost:5173/pb/api/files/${map1.collectionId}/${map1.id}/${map1.map}`)
const url2 = ref(`http://localhost:5173/pb/api/files/${map.collectionId}/${map.id}/${map.map}`)
</script>

<template>
  <div class="mt-6 flex flex-col items-center justify-center h-screen">
    <p class="text-2xl absolute left-0 top-14 m-2">FPS: {{ fps }}</p>

    <a :href="url" target="_blank">{{ url }}</a>

    <iframe
      title="mapa"
      :src="`https://azgaar.github.io/Fantasy-Map-Generator/?maplink=${url}`"
      width="95%"
      height="95%"
    ></iframe>
  </div>
</template>
