export interface DataForCharts {
	states: {
		config: ChartConfig;
		charts: StatesCharts;
	};
	provinces: {
		config: ChartConfig;
		charts: ProvincesCharts;
	};
	burgs: {
		config: ChartConfig;
		charts: BurgsCharts;
	};
	cultures: {
		config: ChartConfig;
		charts: CulturesCharts;
	};
	religions: {
		config: ChartConfig;
		charts: ReligionsCharts;
	};
	misc: {
		config: ChartConfig;
		charts: MiscCharts;
	};
}

export interface DataForChart {
	group: string;
	subgroup: globalThis.ComputedRef<any>;
	config: ChartConfig;
	chart: ChartData[];
}

export interface ChartData {
	turn: number;
	[key: string]: number;
}

export interface ChartConfig {
	categories: string[];
	colors: string[];
}

export interface StatesCharts {
	burgs: ChartData[];
	provinces: ChartData[];
	cells: ChartData[];
	ruralPopulation: ChartData[];
	urbanPopulation: ChartData[];
}

export interface ProvincesCharts {
	burgs: ChartData[];
	cells: ChartData[];
	ruralPopulation: ChartData[];
	urbanPopulation: ChartData[];
}

export interface BurgsCharts {
	population: ChartData[];
}

export interface CulturesCharts {
	cells: ChartData[];
	population: ChartData[];
	burgs: ChartData[];
}

export interface ReligionsCharts {
	cells: ChartData[];
	population: ChartData[];
	burgs: ChartData[];
}

export interface MiscCharts {
	features: ChartData[];
}
