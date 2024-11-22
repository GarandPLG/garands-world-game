import type { DataForCharts } from '@/types/chartsTypes';

export const dFCh: DataForCharts = {
	states: {
		config: { categories: [], colors: [] },
		charts: {
			burgs: [],
			provinces: [],
			cells: [],
			ruralPopulation: [],
			urbanPopulation: []
		}
	},
	provinces: {
		config: { categories: [], colors: [] },
		charts: {
			burgs: [],
			cells: [],
			ruralPopulation: [],
			urbanPopulation: []
		}
	},
	burgs: {
		config: { categories: [], colors: [] },
		charts: {
			population: []
		}
	},
	cultures: {
		config: { categories: [], colors: [] },
		charts: {
			cells: [],
			population: [],
			burgs: []
		}
	},
	religions: {
		config: { categories: [], colors: [] },
		charts: {
			cells: [],
			population: [],
			burgs: []
		}
	},
	misc: {
		config: {
			categories: ['Capitals', 'Ports', 'Citadels', 'Walls', 'Plazas', 'Temples', 'Shanty Towns'],
			colors: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFFFFF']
		},
		charts: {
			features: []
		}
	}
};
