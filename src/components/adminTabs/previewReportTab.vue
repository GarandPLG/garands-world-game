<script lang="ts" setup>
const props = defineProps<{
	title: string;
	description: string;
}>();
</script>

<template>
	<div>
		<Card>
			<CardHeader>
				<CardTitle> {{ props.title }} </CardTitle>

				<CardDescription>{{ props.description }}</CardDescription>
			</CardHeader>

			<Separator />

			<CardContent class="space-y-2 py-6">
				<p>Jeżyk</p>
			</CardContent>
		</Card>
	</div>
</template>
