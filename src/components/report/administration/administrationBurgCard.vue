<script lang="ts" setup>
import type { BurgsResponse, CulturesResponse, ReligionsResponse } from '@/types/pb-types';

const props = defineProps<{
	burg: BurgsResponse<unknown>;
	cultures: CulturesResponse<unknown>[];
	religions: ReligionsResponse<unknown>[];
}>();
</script>

<template>
	<div class="flex h-[177px] w-[500px] flex-col gap-2 rounded-md border">
		<div class="flex items-center justify-center">
			<Button variant="link" as-child class="text-lg font-bold text-foreground">
				<a :href="props.burg.cityGeneratorLink" target="_blank">
					{{ props.burg.name }}
				</a>
			</Button>
		</div>

		<div class="flex flex-row">
			<figure v-html="props.burg.emblemSVG" class="my-[-3rem]"></figure>

			<div class="mr-3 mt-[-0.6rem] flex w-full flex-col">
				<p class="text-base">
					Populacja:
					<span class="text-primary">{{ props.burg.population }}</span>
				</p>

				<p class="text-base">
					Kultura:
					<span class="text-primary">
						{{ props.cultures.find(culture => culture.id === props.burg.culture)?.name }}
					</span>
				</p>

				<p class="text-base">
					Religia:
					<span class="text-primary">
						{{ props.religions.find(religion => religion.id === props.burg.religion)?.name }}
					</span>
				</p>

				<div class="mt-2 grid h-full w-full grid-cols-7 gap-1 rounded-md border p-0.5">
					<div
						class="h-full w-full text-center text-lg hover:rounded-md hover:border"
						:class="props.burg.isCapital ? 'text-primary' : ''"
					>
						Ca
					</div>

					<div
						class="h-full w-full text-center text-lg hover:rounded-md hover:border"
						:class="props.burg.isPort ? 'text-primary' : ''"
					>
						Po
					</div>

					<div
						class="h-full w-full text-center text-lg hover:rounded-md hover:border"
						:class="props.burg.isCitadel ? 'text-primary' : ''"
					>
						Ct
					</div>

					<div
						class="h-full w-full text-center text-lg hover:rounded-md hover:border"
						:class="props.burg.isWalls ? 'text-primary' : ''"
					>
						Wa
					</div>

					<div
						class="h-full w-full text-center text-lg hover:rounded-md hover:border"
						:class="props.burg.isPlaza ? 'text-primary' : ''"
					>
						Pl
					</div>

					<div
						class="h-full w-full text-center text-lg hover:rounded-md hover:border"
						:class="props.burg.isTemple ? 'text-primary' : ''"
					>
						Te
					</div>

					<div
						class="h-full w-full text-center text-lg hover:rounded-md hover:border"
						:class="props.burg.isShantyTown ? 'text-primary' : ''"
					>
						ST
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
