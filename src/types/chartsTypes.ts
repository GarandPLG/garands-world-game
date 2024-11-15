interface DataForCharts {
	states: {
		config: Config;
		charts: {
			burgs: ChartData[];
			provinces: ChartData[];
			cells: ChartData[];
			ruralPopulation: ChartData[];
			urbanPopulation: ChartData[];
		};
	};
	provinces: {
		config: Config;
		charts: {
			burgs: ChartData[];
			cells: ChartData[];
			ruralPopulation: ChartData[];
			urbanPopulation: ChartData[];
		};
	};
	burgs: {
		config: Config;
		charts: {
			population: ChartData[];
			religions: ChartData[];
			cultures: ChartData[];
			capitals: ChartData[];
			ports: ChartData[];
			cities: ChartData[];
			walls: ChartData[];
			plazas: ChartData[];
			temples: ChartData[];
			shantyTowns: ChartData[];
		};
	};
	cultures: {
		config: Config;
		charts: {
			cells: ChartData[];
			population: ChartData[];
			types: ChartData[];
			namesbases: ChartData[];
		};
	};
	religions: {
		config: Config;
		charts: {
			cells: ChartData[];
			population: ChartData[];
			types: ChartData[];
			forms: ChartData[];
		};
	};
}

interface ChartData {
	turn: number;
	[key: string]: number;
}

interface Config {
	categories: string[];
	colors?: string[];
}

export type { ChartData, Config, DataForCharts };
