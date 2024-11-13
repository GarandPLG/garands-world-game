<script setup lang="ts">
interface Map {
	collectionId: string;
	collectionName: string;
	created: string;
	date: string;
	file: string;
	id: string;
	name: string;
	turn: string;
	updated: string;
	expand?: {
		turn: {
			collectionId: string;
			collectionName: string;
			created: string;
			id: string;
			updated: string;
			value: number;
		};
	};
}

const pb = usePocketBase();
const fps = useFps();

const pbMaps = await pb.collection('maps').getFullList({
	expand: 'turn'
});

const maps: { [key: string]: Map } = pbMaps.reduce((acc, map: Map) => {
	let key: string;

	if (map.expand) key = `Tura ${map.expand.turn.value}`;
	else key = map.name;

	acc[key] = map;
	return acc;
}, {});
</script>

<template>
	<div class="mt-12 flex h-screen flex-col items-center justify-center">
		<p class="absolute right-0 top-28 m-2 bg-slate-500 bg-opacity-55 p-2 text-2xl text-black">
			FPS: {{ fps }}
		</p>

		<Tabs
			:default-value="maps[Object.keys(maps)[0]].name"
			class="flex w-full flex-col items-center justify-center"
		>
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
					:src="`https://azgaar.github.io/Fantasy-Map-Generator/?maplink=http://localhost:5173/pb/api/files/${map.collectionId}/${map.id}/${map.file}`"
					width="100%"
					height="100%"
					class="items-center justify-center"
				></iframe>
			</TabsContent>
		</Tabs>
	</div>
</template>
