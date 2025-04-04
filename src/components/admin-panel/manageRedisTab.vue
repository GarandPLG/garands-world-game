<script lang="ts" setup>
const props = defineProps<{
	title: string;
	description: string;
}>();
const { flushAll } = useRedis();
</script>

<template>
	<Card>
		<CardHeader>
			<CardTitle> {{ props.title }} </CardTitle>

			<CardDescription>{{ props.description }}</CardDescription>
		</CardHeader>

		<Separator />

		<CardContent class="flex flex-col items-center space-y-2 py-6">
			<!-- <p>Placeholder</p> -->

			<Button @click="flushAll" variant="destructive" class="w-1/3">
				Wyczyść wszystkie klucze
			</Button>
		</CardContent>
	</Card>
</template>
