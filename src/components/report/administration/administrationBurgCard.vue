<script lang="ts" setup>
import type { BurgsResponse } from '@/types/pb-types';
import { Icon } from '@iconify/vue';

const props = defineProps<{
	burg: BurgsResponse<unknown>;
}>();

const { state, turn } = storeToRefs(useReportStore());

const { cultureData, religionData } = await useFetchAdministrationReport(turn.value, state.value);
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
					<span class="text-primary">{{ useFormatNumber(props.burg.population) }}</span>
				</p>

				<p class="text-base">
					Kultura:
					<span class="text-primary">
						{{ cultureData.find(culture => culture.id === props.burg.culture)?.name }}
					</span>
				</p>

				<p class="text-base">
					Religia:
					<span class="text-primary">
						{{ religionData.find(religion => religion.id === props.burg.religion)?.name }}
					</span>
				</p>

				<div class="mt-2 grid h-full w-full grid-cols-7 gap-1 rounded-md border p-0.5">
					<div class="h-full w-full p-1 text-center text-lg hover:p-1.5">
						<Icon
							icon="material-symbols:award-star"
							:class="props.burg.isCapital ? 'text-primary' : 'text-muted-foreground'"
							class="h-full w-full"
						/>
					</div>

					<div class="h-full w-full p-1 text-center text-lg hover:p-1.5">
						<Icon
							icon="material-symbols:anchor"
							:class="props.burg.isPort ? 'text-primary' : 'text-muted-foreground'"
							class="h-full w-full"
						/>
					</div>

					<div class="h-full w-full p-1 text-center text-lg hover:p-1.5">
						<Icon
							icon="game-icons:white-tower"
							:class="props.burg.isCitadel ? 'text-primary' : 'text-muted-foreground'"
							class="h-full w-full"
						/>
					</div>

					<div class="h-full w-full p-1 text-center text-lg hover:p-1.5">
						<Icon
							icon="game-icons:defensive-wall"
							:class="props.burg.isWalls ? 'text-primary' : 'text-muted-foreground'"
							class="h-full w-full"
						/>
					</div>

					<div class="h-full w-full p-1 text-center text-lg hover:p-1.5">
						<Icon
							icon="lsicon:marketplace-outline"
							:class="props.burg.isPlaza ? 'text-primary' : 'text-muted-foreground'"
							class="h-full w-full"
						/>
					</div>

					<div class="h-full w-full p-1 text-center text-lg hover:p-1.5">
						<Icon
							icon="tdesign:temple-filled"
							:class="props.burg.isTemple ? 'text-primary' : 'text-muted-foreground'"
							class="h-full w-full"
						/>
					</div>

					<div class="h-full w-full p-1 text-center text-lg hover:p-1.5">
						<Icon
							icon="game-icons:camping-tent"
							:class="props.burg.isShantyTown ? 'text-primary' : 'text-muted-foreground'"
							class="h-full w-full"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
