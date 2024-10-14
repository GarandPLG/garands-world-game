<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface Map {
  collectionId: string
  collectionName: string
  created: string
  date: string
  file: string
  id: string
  name: string
  turn: string
  updated: string
  expand?: {
    turn: {
      collectionId: string
      collectionName: string
      created: string
      id: string
      updated: string
      value: number
    }
  }
}

const pb = usePocketBase()
const fps = useFps()

const pbMaps = await pb.collection('maps').getFullList({
  expand: 'turn'
})

const maps: { [key: string]: Map } = pbMaps.reduce((acc, map) => {
  const turn = map.expand?.turn?.value
  const key = turn ? `Tura ${turn}` : map.name
  acc[key] = map
  return acc
}, {})
</script>

<template>
  <div class="mt-12 flex flex-col items-center justify-center h-screen">
    <p class="text-2xl absolute right-0 top-28 m-2 text-black bg-slate-500 p-2 bg-opacity-55">
      FPS: {{ fps }}
    </p>

    <Tabs default-value="Tura 1" class="w-full flex flex-col items-center justify-center">
      <TabsList class="w-full items-center justify-center">
        <TabsTrigger v-for="(map, key) in maps" :key="key" :value="key">
          {{ key }}
        </TabsTrigger>
      </TabsList>

      <TabsContent
        v-for="(map, key) in maps"
        :key="key"
        :value="key"
        class="w-full h-screen flex-col items-center justify-center"
      >
        <iframe
          title="mapa"
          :src="`https://azgaar.github.io/Fantasy-Map-Generator/?maplink=http://localhost:5173/pb/api/files/${map.collectionId}/${map.id}/${map.file}`"
          width="100%"
          height="100%"
          class="items-center justify-center"
        ></iframe>
      </TabsContent>
    </Tabs>
  </div>
</template>
