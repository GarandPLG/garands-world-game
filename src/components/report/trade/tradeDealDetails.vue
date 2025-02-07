<script lang="ts" setup>
const props = defineProps<{
	volume: number;
	price: number;
	isExport: boolean;
}>();

const value = computed(() => props.price * props.volume * (props.isExport ? -1 : 1));
</script>

<template>
	<div class="mt-5 rounded-md border p-3">
		<div class="grid grid-cols-2 gap-2">
			<span>Ilość:</span>
			<span class="text-right text-primary">{{ useFormatNumber(volume) }}</span>

			<span>Cena:</span>
			<span class="text-right text-primary">{{ useFormatNumber(price) }}</span>

			<span>Wartość:</span>
			<span class="text-right text-primary">{{ useFormatNumber(value) }}</span>
		</div>
	</div>
</template>
