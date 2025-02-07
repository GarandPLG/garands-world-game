<script lang="ts" setup>
import type { StatesResponse } from '@/types/pb-types';

const props = defineProps<{
	state: StatesResponse<unknown, unknown, unknown, unknown, unknown>;
}>();
</script>

<template>
	<div class="flex h-[165px] w-[200px] flex-col gap-3 rounded-md border">
		<div class="flex items-center justify-center">
			<span class="mr-2 h-3 w-3">
				<svg width="100%" height="100%" viewBox="0 0 30 30">
					<path
						d="M 15 15 m -14, 0 a 14,14 0 1,1 28,0 a 14,14 0 1,1 -28,0"
						:stroke="state.color"
						:fill="state.color"
						stroke-width="1"
					/>
				</svg>
			</span>
			<h3 class="text-center text-lg font-bold">{{ state.name }}</h3>
		</div>

		<figure v-html="state.emblemSVG" class="my-[-3rem]"></figure>
	</div>
</template>
