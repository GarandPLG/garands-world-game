export const chartsCategories = [
	{
		name: 'states',
		label: 'Państwa',
		description: 'Statystyki państw',
		labels: {
			cells: 'Ilość kratek',
			burgs: 'Ilość miast',
			provinces: 'Ilość prowincji',
			ruralPopulation: 'Ilość populacji wiejskiej ',
			urbanPopulation: 'Ilość populacji miejskiej'
		}
	},
	{
		name: 'provinces',
		label: 'Prowincje',
		description: 'Statystyki prowincji',
		labels: {
			cells: 'Ilość kratek',
			burgs: 'Ilość miast',
			ruralPopulation: 'Ilość populacji wiejskiej ',
			urbanPopulation: 'Ilość populacji miejskiej'
		}
	},
	{
		name: 'burgs',
		label: 'Miasta',
		description: 'Statystyki miast',
		labels: { population: 'Ilość populacji' }
	},
	{
		name: 'cultures',
		label: 'Kultury',
		description: 'Statystyki kultur',
		labels: { cells: 'Ilość kratek', population: 'Ilość populacji', burgs: 'Ilość miast' }
	},
	{
		name: 'religions',
		label: 'Religie',
		description: 'Statystyki religii',
		labels: { cells: 'Ilość kratek', population: 'Ilość populacji', burgs: 'Ilość miast' }
	},
	{
		name: 'misc',
		label: 'Pozostałe',
		description: 'pozostałe statystyki',
		labels: { features: 'Własności miast' }
	}
];
