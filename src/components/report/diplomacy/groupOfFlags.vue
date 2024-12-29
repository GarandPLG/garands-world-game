<script lang="ts" setup>
interface Flag {
	name: string;
	emblemSVG: string;
}

const props = defineProps<{
	flags: Flag[];
}>();
</script>

<template>
	<div class="flex flex-wrap justify-center gap-6">
		<div
			v-for="state in props.flags"
			:key="state.name"
			class="flex h-[165px] w-[200px] flex-col gap-3 rounded-md border"
		>
			<h3 class="text-center text-lg font-bold">{{ state.name }}</h3>

			<figure v-html="state.emblemSVG" class="my-[-3rem]"></figure>
		</div>
	</div>
</template>

<style>
figure {
	display: inline-block;
	transition: 0.2s;
}
figcaption {
	text-align: center;
	margin: 0.4em 0;
	font-family: 'Overlock SC';
}
address {
	width: 100%;
	max-width: 1018px;
	margin: 0 auto;
}
figure > a {
	text-decoration: none;
}
</style>
