<script lang="ts" setup>
import type { StatesResponse, TurnsResponse } from '@/types/pb-types';

const props = defineProps<{
	turn: TurnsResponse<unknown>;
	state: StatesResponse<unknown, unknown, unknown, unknown, unknown>;
}>();
const { cultureNames, burgsData } = await useFetchAdministrationReport(props.turn, props.state);

const cells = props.state.cells;
const primaryCulture = cultureNames.find(c => c.id === props.state.culture)?.id;
const cultureCells = props.state.culturesCells as Record<string, string>;
const nonPrimaryCultureCells = Object.values(cultureCells).reduce(
	(sum, value, key) => (key === primaryCulture ? sum : sum + parseInt(value)),
	0
);

const burgs = burgsData.value.length;
const nonPrimaryCultureBurgs = burgsData.value.filter(b => b.culture !== primaryCulture).length;
const sumGovernmentCapacityPoints = cells + nonPrimaryCultureCells + burgs + nonPrimaryCultureBurgs;

const governmentCapacityLimit =
	constGovernmentTypes.find(g => g.name === props.state.form)?.governmentCapacityLimit || 0;
const technologieGovernmentCapacityLimit = 50;
const sumGovernmentCapacityLimit = governmentCapacityLimit + technologieGovernmentCapacityLimit;
const governmentCapacity = Math.round(
	(sumGovernmentCapacityPoints / sumGovernmentCapacityLimit) * 100
);
const progress = ref(Math.min(governmentCapacity, 100));

const CapacityCard = defineComponent({
	props: { title: String },
	template: /*HTML*/ `
    <div class='relative mt-2 h-auto w-full rounded-md border p-5'>
      <span class='absolute -top-4 left-2 bg-background px-2 text-xl text-primary'>
        {{ title }}
      </span>
      <slot></slot>
    </div>`
});

const CapacityRow = defineComponent({
	props: { label: String, value: Number },
	template: /*HTML*/ `
    <TableRow>
      <TableCell>{{ label }}</TableCell>
      <TableCell class='text-right'>{{ useFormatNumber(value) }}</TableCell>
    </TableRow>`
});

const CapacitySum = defineComponent({
	props: { value: Number },
	template: /*HTML*/ `
    <p class='absolute bottom-3 start-1/3 mt-4 text-center text-lg'>
      Suma: <span class='text-primary'>{{ useFormatNumber(value) }}</span>
    </p>`
});
</script>

<template>
	<div class="w-full p-6">
		<Label class="mt-3 text-lg" for="progress">
			Wykorzystanie: {{ useFormatNumber(sumGovernmentCapacityPoints) }} /
			{{ useFormatNumber(sumGovernmentCapacityLimit) }}
			(<span class="text-primary">{{ governmentCapacity }}</span
			>%)
		</Label>

		<Progress v-model="progress" class="mt-1 w-3/5" id="progress" />

		<div class="mt-9 grid grid-cols-2 gap-10">
			<CapacityCard title="Koszty administracyjne">
				<CapacityRow label="Kratki" :value="cells" />
				<CapacityRow label="Kratki ob. kultura" :value="nonPrimaryCultureCells" />
				<CapacityRow label="Miasta" :value="burgs" />
				<CapacityRow label="Miasta ob. kultura" :value="nonPrimaryCultureBurgs" />
				<CapacitySum :value="sumGovernmentCapacityPoints" />
			</CapacityCard>

			<CapacityCard title="Źródła pojemności">
				<CapacityRow label="Forma rządu" :value="governmentCapacityLimit" />
				<CapacityRow label="Technologia" :value="technologieGovernmentCapacityLimit" />
				<CapacitySum :value="sumGovernmentCapacityLimit" />
			</CapacityCard>
		</div>
	</div>
</template>
