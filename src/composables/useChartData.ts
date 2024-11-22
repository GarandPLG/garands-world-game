import type { ChartData, DataForChart } from '@/types/chartsTypes';
// TODO: dodać specjalne przypadki
export const useChartData = (cd: any, dataForChart: globalThis.ComputedRef<DataForChart>) => {
	const generateChartContent = () => {
		for (let i = 0; i < cd.turnsData.value.length - 1; i++) {
			const turn = cd.turnsData.value[i];
			const dataInTurn = cd[`${dataForChart.value.group}Data`].value.filter(
				item => item.turn === turn.id
			);
			const dataItem = { turn: turn.value } as ChartData;

			for (let j = 0; j < dataInTurn.length; j++) {
				const item = dataInTurn[j];
				dataItem[item.name] = item[dataForChart.value.subgroup];
			}
			dataForChart.value.chart.push(dataItem);

			// metrics.forEach(metric => {
			// 	const dataItem = { turn: turn.value };
			// 	if (metric === 'burgs' && (key === 'states' || key === 'religions' || key === 'cultures')) {
			// 		dataInTurn.forEach(item => {
			// 			const burgsCount = cd.burgsData.value.filter(
			// 				burg => burg[key.slice(0, -1)] === item.id
			// 			).length;
			// 			dataItem[item.name] = burgsCount || 0;
			// 		});
			// 	} else {
			// 		dataInTurn.forEach(item => {
			// 			dataItem[item.name] = item[metric] || 0;
			// 		});
			// 	}
			// 	dataForCharts.value[key].charts[metric].push(dataItem);
			// });
		}

		// Object.entries(chartMappings).forEach(([key, metrics]) => {
		// 	for (let i = 0; i < cd.turnsData.value.length - 1; i++) {
		// 		const turn = cd.turnsData.value[i];
		// 		const dataInTurn = cd[`${key}Data`].value.filter(item => item.turn === turn.id);
		// 		metrics.forEach(metric => {
		// 			const dataItem = { turn: turn.value };
		// 			if (
		// 				metric === 'burgs' &&
		// 				(key === 'states' || key === 'religions' || key === 'cultures')
		// 			) {
		// 				dataInTurn.forEach(item => {
		// 					const burgsCount = cd.burgsData.value.filter(
		// 						burg => burg[key.slice(0, -1)] === item.id
		// 					).length;
		// 					dataItem[item.name] = burgsCount || 0;
		// 				});
		// 			} else {
		// 				dataInTurn.forEach(item => {
		// 					dataItem[item.name] = item[metric] || 0;
		// 				});
		// 			}
		// 			dataForCharts.value[key].charts[metric].push(dataItem);
		// 		});
		// 	}
		// });
		// for (let i = 0; i < cd.turnsData.value.length - 1; i++) {
		// 	const turn = cd.turnsData.value[i];
		// 	const statesDataInTurn = cd.statesData.value.filter(state => state.turn === turn.id);
		// 	const dataItem = { turn: turn.value };
		// 	statesDataInTurn.forEach(state => {
		// 		const provincesCount = cd.provincesData.value.filter(
		// 			province => province.state === state.id
		// 		).length;
		// 		dataItem[state.name] = provincesCount;
		// 	});
		// 	dataForCharts.value.states.charts.provinces.push(dataItem);
		// }
		// for (let i = 0; i < cd.turnsData.value.length - 1; i++) {
		// 	const turn = cd.turnsData.value[i];
		// 	const burgsDataInTurn = cd.burgsData.value.filter(burg => burg.turn === turn.id);
		// 	const populationDataItem = { turn: turn.value };
		// 	const buildingsFeatures = [0, 0, 0, 0, 0, 0, 0];
		// 	burgsDataInTurn.forEach(burg => {
		// 		populationDataItem[burg.name] = burg.population || 0;
		// 		if (burg.isCapital) buildingsFeatures[0]++;
		// 		if (burg.isPort) buildingsFeatures[1]++;
		// 		if (burg.isCitadel) buildingsFeatures[2]++;
		// 		if (burg.isWalls) buildingsFeatures[3]++;
		// 		if (burg.isPlaza) buildingsFeatures[4]++;
		// 		if (burg.isTemple) buildingsFeatures[5]++;
		// 		if (burg.isShantyTown) buildingsFeatures[6]++;
		// 	});
		// 	dataForCharts.value.burgs.charts.population.push(populationDataItem);
		// 	const featuresDataItem = { turn: turn.value };
		// 	dataForCharts.value.misc.config.categories.forEach((category, index) => {
		// 		featuresDataItem[category] = buildingsFeatures[index];
		// 	});
		// 	dataForCharts.value.misc.charts.features.push(featuresDataItem);
		// }
	};

	return { generateChartContent };
};
