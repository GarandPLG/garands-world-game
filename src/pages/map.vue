<script setup lang="ts">
import type { MapsResponse, TurnsResponse } from '@/types/pb-types';

type Map = MapsResponse<{
	turn?: TurnsResponse;
}>;

const pb = usePocketBase();
const { toast } = useToast();
const fps = useFps();

const pbMaps = await pb
	.collection('maps')
	.getFullList({
		expand: 'turn'
	})
	.catch((error: unknown) => {
		toast({
			title: `Błąd przy pobieraniu map!`,
			description: error instanceof Error ? `${error.name}: ${error.message}` : 'Nieznany błąd.'
		});
		if (error instanceof Error) throw error;
	});

const maps: { [key: string]: Map } = pbMaps.reduce((acc, map: Map) => {
	let key: string;

	if (map.expand) key = `Tura ${map.expand.turn?.value}`;
	else key = map.name;

	acc[key] = map;
	return acc;
}, {});

const defaultMap = computed(() => Object.keys(maps)[Object.keys(maps).length - 1]);

const pb_origin = import.meta.env.PROD ? 'http://localhost:8090' : 'http://localhost:5173/pb';

useHead({
	title: "Garand's WG | Mapa"
});
</script>

<template>
	<div class="mt-12 flex h-screen flex-col items-center justify-center">
		<p class="absolute right-0 top-28 m-2 bg-slate-500 bg-opacity-55 p-2 text-2xl text-black">
			FPS: {{ fps }}
		</p>

		<Tabs :default-value="defaultMap" class="flex w-full flex-col items-center justify-center">
			<TabsList class="w-full items-center justify-center">
				<TabsTrigger v-for="(map, key) in maps" :key="key" :value="key">
					{{ key }}
				</TabsTrigger>
			</TabsList>

			<TabsContent
				v-for="(map, key) in maps"
				:key="key"
				:value="key"
				class="h-screen w-full flex-col items-center justify-center"
			>
				<iframe
					title="mapa"
					:src="`https://azgaar.github.io/Fantasy-Map-Generator/?maplink=${pb_origin}/api/files/${map.collectionId}/${map.id}/${map.map}`"
					width="100%"
					height="100%"
					class="items-center justify-center"
				></iframe>
			</TabsContent>
		</Tabs>
	</div>
</template>
