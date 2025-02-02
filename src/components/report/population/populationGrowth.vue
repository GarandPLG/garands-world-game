<script lang="ts" setup>
const props = defineProps<{
	rural: number;
	urban: number;
	growthRate: number;
}>();

const growthRatePerMille = computed(() => props.growthRate / 1000);

const ruralData = computed(() => ({
	current: props.rural,
	change: Math.floor(props.rural * growthRatePerMille.value),
	growth: props.rural + Math.floor(props.rural * growthRatePerMille.value)
}));

const urbanData = computed(() => ({
	current: props.urban,
	change: Math.floor(props.urban * growthRatePerMille.value),
	growth: props.urban + Math.floor(props.urban * growthRatePerMille.value)
}));

const totalData = computed(() => ({
	current: ruralData.value.current + urbanData.value.current,
	change: ruralData.value.change + urbanData.value.change,
	growth: ruralData.value.growth + urbanData.value.growth
}));

const formatNumber = (num: number) => num.toLocaleString('en-US');

const getChangeColor = (change: number) => {
	if (change > 0) return 'text-green-500';
	if (change < 0) return 'text-red-500';
	return 'text-orange-500';
};

const getChangeSymbol = (change: number) => {
	if (change > 0) return '↑';
	if (change < 0) return '↓';
	return '→';
};

const formatChange = (change: number) => {
	const prefix = change > 0 ? '+' : '';
	return `${prefix}${formatNumber(change)}`;
};
</script>

<template>
	<div class="mx-auto max-w-4xl space-y-8 p-6">
		<div class="text-center">
			<h1 class="text-3xl font-bold">
				Przyrost naturalny:
				<span class="text-primary">{{ props.growthRate }}‰</span>
			</h1>
		</div>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			<div class="stat-card">
				<h2 class="mb-4 text-xl font-semibold">
					Populacja <span class="text-primary">wiejska</span>
				</h2>

				<div class="numbers-display">
					<div class="text-2xl font-bold">
						{{ formatNumber(ruralData.current) }}
					</div>

					<div :class="getChangeColor(ruralData.change)">
						{{ getChangeSymbol(ruralData.change) }}
						{{ formatChange(ruralData.change) }}
					</div>

					<div class="text-xl">
						{{ formatNumber(ruralData.growth) }}
					</div>
				</div>
			</div>

			<div class="stat-card">
				<h2 class="mb-4 text-xl font-semibold">
					Populacja <span class="text-primary">miejska</span>
				</h2>

				<div class="numbers-display">
					<div class="text-2xl font-bold">
						{{ formatNumber(urbanData.current) }}
					</div>

					<div :class="getChangeColor(urbanData.change)">
						{{ getChangeSymbol(urbanData.change) }}
						{{ formatChange(urbanData.change) }}
					</div>

					<div class="text-xl">
						{{ formatNumber(urbanData.growth) }}
					</div>
				</div>
			</div>
		</div>

		<div class="stat-card">
			<h2 class="mb-4 text-xl font-semibold">
				<span class="text-primary">Podsumowanie</span>
			</h2>

			<div class="flex items-center justify-center space-x-4">
				<span class="text-2xl font-bold">
					{{ formatNumber(totalData.current) }}
				</span>

				<div class="flex flex-col items-center">
					<span :class="getChangeColor(totalData.change)">
						{{ getChangeSymbol(totalData.change) }}
						{{ formatChange(totalData.change) }}
					</span>
				</div>

				<span class="text-2xl">
					{{ formatNumber(totalData.growth) }}
				</span>
			</div>
		</div>
	</div>
</template>

<style scoped>
.stat-card {
	@apply rounded-lg rounded-md border bg-background p-6 text-center shadow-md;
}

.numbers-display {
	@apply flex flex-col items-center space-y-2;
}
</style>
