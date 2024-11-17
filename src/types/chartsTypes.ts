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
			// features: ChartData[];
		};
	};
	cultures: {
		config: Config;
		charts: {
			cells: ChartData[];
			population: ChartData[];
			burgs: ChartData[];
		};
	};
	religions: {
		config: Config;
		charts: {
			cells: ChartData[];
			population: ChartData[];
			burgs: ChartData[];
		};
	};
	misc: {
		config: Config;
		charts: {
			features: ChartData[];
		};
	};
}

interface ChartData {
	turn: number;
	[key: string]: number;
}

interface Config {
	categories: string[];
	colors: string[];
}

export type { ChartData, Config, DataForCharts };
