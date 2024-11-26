import type { ChartData, DataForChart } from '@/types/chartsTypes';

export const useChartData = (cd: any, dataForChart: globalThis.ComputedRef<DataForChart>) => {
	const generateChartContent = () => {
		for (let i = 0; i < cd.turnsData.value.length - 1; i++) {
			const turn = cd.turnsData.value[i];
			const grupData =
				dataForChart.value.group === 'misc' ? 'burgsData' : `${dataForChart.value.group}Data`;
			const dataInTurn = cd[grupData].value.filter(item => item.turn === turn.id);
			const dataItem = { turn: turn.value } as ChartData;

			if (dataForChart.value.group == 'states' && dataForChart.value.subgroup == 'provinces')
				for (let j = 0; j < dataInTurn.length; j++) {
					const item = dataInTurn[j];
					const provincesInItem = cd.provincesData.value.filter(
						province => province.state === item.id
					);
					dataItem[item.name] = provincesInItem.length;
				}
			else if (dataForChart.value.group == 'religions' && dataForChart.value.subgroup == 'burgs')
				for (let j = 0; j < dataInTurn.length; j++) {
					const item = dataInTurn[j];
					const burgsInItem = cd.burgsData.value.filter(burg => burg.religion === item.id);
					dataItem[item.name] = burgsInItem.length;
				}
			else if (dataForChart.value.group == 'cultures' && dataForChart.value.subgroup == 'burgs')
				for (let j = 0; j < dataInTurn.length; j++) {
					const item = dataInTurn[j];
					const burgsInItem = cd.burgsData.value.filter(burg => burg.culture === item.id);
					dataItem[item.name] = burgsInItem.length;
				}
			else if (dataForChart.value.group == 'misc' && dataForChart.value.subgroup == 'features') {
				const features = [
					'Capitals',
					'Ports',
					'Citadels',
					'Walls',
					'Plazas',
					'Temples',
					'Shanty Towns'
				];
				const buildingsFeatures = features.map(feature => 0);
				for (let j = 0; j < dataInTurn.length; j++) {
					const item = dataInTurn[j];
					if (item.isCapital) buildingsFeatures[0]++;
					if (item.isPort) buildingsFeatures[1]++;
					if (item.isCitadel) buildingsFeatures[2]++;
					if (item.isWalls) buildingsFeatures[3]++;
					if (item.isPlaza) buildingsFeatures[4]++;
					if (item.isTemple) buildingsFeatures[5]++;
					if (item.isShantyTown) buildingsFeatures[6]++;
				}
				features.forEach((feature, index) => {
					dataItem[feature] = buildingsFeatures[index];
				});
			} else
				for (let j = 0; j < dataInTurn.length; j++) {
					const item = dataInTurn[j];
					dataItem[item.name] = item[dataForChart.value.subgroup];
				}
			dataForChart.value.chart.push(dataItem);
		}
	};

	return { generateChartContent };
};
