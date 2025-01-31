<script lang="ts" setup>
import type { ProvincesResponse } from '@/types/pb-types';

const props = defineProps<{ province: ProvincesResponse<unknown> }>();
</script>

<template>
	<div class="flex h-[165px] w-[500px] flex-col gap-2 rounded-md border">
		<div class="flex items-center justify-center">
			<span class="mr-2 h-3 w-3" v-if="props.province.color">
				<svg width="100%" height="100%" viewBox="0 0 30 30">
					<path
						d=" M 15 15 m -14, 0 a 14,14 0 1,1 28,0 a 14,14 0 1,1 -28,0"
						:stroke="props.province.color"
						:fill="props.province.color"
						stroke-width="1"
					/>
				</svg>
			</span>

			<h3 class="text-center text-lg font-bold">
				{{ props.province.nameFull }} (
				<span class="text-primary">{{ props.province.name }}</span>
				)
			</h3>
		</div>

		<div class="flex flex-row">
			<figure v-html="props.province.emblemSVG" class="my-[-3rem]"></figure>

			<div class="mt-[-0.6rem] flex flex-col">
				<p class="text-base">
					Stolica:
					<span class="text-primary">{{ props.province.capital }}</span>
				</p>

				<p class="text-base">
					Populacja wiejska:
					<span class="text-primary">{{
						props.province.ruralPopulation.toLocaleString('en-US')
					}}</span>
				</p>

				<p class="text-base">
					Populacja miejska:
					<span class="text-primary">{{
						props.province.urbanPopulation.toLocaleString('en-US')
					}}</span>
				</p>

				<p class="text-base">
					Ilość miast:
					<span class="text-primary">{{ props.province.burgs.toLocaleString('en-US') }}</span>
				</p>

				<p class="text-base">
					Ilość kratek:
					<span class="text-primary">{{ props.province.cells.toLocaleString('en-US') }}</span>
				</p>
			</div>
		</div>
	</div>
</template>
