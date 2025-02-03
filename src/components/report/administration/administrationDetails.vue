<script lang="ts" setup>
import type { StatesResponse, TurnsResponse } from '@/types/pb-types';

const props = defineProps<{
	turn: TurnsResponse<unknown>;
	state: StatesResponse<unknown, unknown, unknown, unknown, unknown>;
}>();
const { cultureNames, burgsData } = await useFetchAdministrationReport(props.turn, props.state);

const cells = props.state.cells;
const primaryCulture = cultureNames.find(
	(cultureName: { id: string; name: string }) => cultureName.id === props.state.culture
).id;
const cultureCells = props.state.culturesCells as Record<string, number>;

const nonPrimaryCultureCells = Object.entries(cultureCells).reduce((suma, [klucz, wartość]) => {
	return klucz === primaryCulture ? suma : suma + parseInt(wartość);
}, 0);

const burgs = burgsData.value.length;

const nonPrimaryCultureBurgs = burgsData.value.filter(
	burg => burg.culture !== primaryCulture
).length;

const sumGovernmentCapacityPoints = cells + nonPrimaryCultureCells + burgs + nonPrimaryCultureBurgs;

const governmentCapacityLimit = constGovernmentTypes.find(
	government => government.name === props.state.form
).governmentCapacityLimit;

const technologieGovernmentCapacityLimit = 1 * 50;

const sumGovernmentCapacityLimit = governmentCapacityLimit + technologieGovernmentCapacityLimit;

const governmentCapacity = Math.round(
	(sumGovernmentCapacityPoints / sumGovernmentCapacityLimit) * 100
);

const progress = ref<number>(
	Math.min(Math.round((sumGovernmentCapacityPoints / sumGovernmentCapacityLimit) * 100), 100)
);

// TODO: Dodać limit administracyjny, wyliczanie % zapełnienia limitu i jego wypisywanie w <Progress />>
</script>

<template>
	<div class="w-full p-6">
		<Label class="mt-3 text-lg" for="progress">
			Wykorzystanie: {{ useFormatNumber(sumGovernmentCapacityPoints) }} /
			{{ useFormatNumber(sumGovernmentCapacityLimit) }} (
			<span class="text-primary"> {{ governmentCapacity }}</span
			>% )
		</Label>

		<Progress v-model="progress" class="mt-1 w-3/5" id="progress" />

		<div class="mt-9 grid grid-cols-2 gap-10">
			<div class="relative mt-2 h-auto w-full rounded-md border p-5">
				<span class="absolute -top-4 left-2 bg-background px-2 text-xl text-primary">
					Koszty administracyjne
				</span>

				<Table class="mb-7">
					<TableHeader>
						<TableRow>
							<TableHead> Typ </TableHead>

							<TableHead> Punkty </TableHead>

							<TableHead class="text-right"> Ilość </TableHead>
						</TableRow>
					</TableHeader>

					<TableBody class="font-medium">
						<TableRow>
							<TableCell> Kratki </TableCell>

							<TableCell> 1 </TableCell>

							<TableCell class="text-right"> {{ useFormatNumber(cells) }} </TableCell>
						</TableRow>

						<TableRow>
							<TableCell> Kratki ob. kultura </TableCell>

							<TableCell> 1 </TableCell>

							<TableCell class="text-right">
								{{ useFormatNumber(nonPrimaryCultureCells) }}
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell> Miasta </TableCell>

							<TableCell> 1 </TableCell>

							<TableCell class="text-right"> {{ useFormatNumber(burgs) }} </TableCell>
						</TableRow>

						<TableRow>
							<TableCell> Miasta ob. kultura </TableCell>

							<TableCell> 1 </TableCell>

							<TableCell class="text-right">
								{{ useFormatNumber(nonPrimaryCultureBurgs) }}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>

				<p class="absolute bottom-3 start-1/3 mt-4 text-center text-lg">
					Suma:
					<span class="text-primary"> {{ useFormatNumber(sumGovernmentCapacityPoints) }} </span>
				</p>
			</div>

			<div class="relative mt-2 h-auto w-full rounded-md border p-5">
				<span class="absolute -top-4 left-2 bg-background px-2 text-xl text-primary">
					Źródła pojemności
				</span>

				<Table class="mb-7">
					<TableHeader>
						<TableRow>
							<TableHead> Typ </TableHead>

							<TableHead class="text-right"> Ilość </TableHead>
						</TableRow>
					</TableHeader>

					<TableBody class="font-medium">
						<TableRow>
							<TableCell> Forma rządu </TableCell>

							<TableCell class="text-right">
								{{ useFormatNumber(governmentCapacityLimit) }}
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell> Technologia </TableCell>

							<TableCell class="text-right">
								{{ useFormatNumber(technologieGovernmentCapacityLimit) }}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>

				<p class="absolute bottom-3 start-1/3 mt-4 text-center text-lg">
					Suma:
					<span class="text-primary">
						{{ useFormatNumber(sumGovernmentCapacityLimit) }}
					</span>
				</p>
			</div>
		</div>
	</div>
</template>

<!--
┌─── Pojemność Administracyjna ───────────────────────────────────────┐
│                                                                     │
│  Wykorzystanie: 387 / 500 ( 77% )                                   │
│  [█████████████████████░░░░░░░░░]                                   │
│                                                                     │
│  ┌─ Koszty administracyjne ─┐    ┌─ Źródła pojemności ─┐            │
│  │                          │    │                      │           │
│  │  Kratki:          250    │    │  Forma rządu:   300  │           │
│  │  Kratki ob. kult:  50    │    │  Technologia:   200  │           │
│  │  Miasta:           75    │    │                      │           │
│  │  Miasta ob. kult:  12    │    │                      │           │ 
│  │                          │    │                      │           │
│  │  Suma:            387    │    │  Suma:          500  │           │
│  └──────────────────────────┘    └──────────────────────┘           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
-->
