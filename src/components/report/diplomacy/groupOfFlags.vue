<script lang="ts" setup>
interface Flag {
	name: string;
	emblemSVG: string;
	color: string;
}

const props = defineProps<{
	flags: Flag[];
}>();
</script>

<template>
	<div class="flex flex-wrap justify-center gap-6">
		<ShowEmblemFrame v-for="state in props.flags" :key="state.name" :state="state" />
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
