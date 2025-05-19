export interface mapExtractedStates {
	name: string;
	nameFull: string;
	form: string;
	color: string;
	culture: string;
	capital: string;
	cells: number;
	burgs: number;
	provinces: number;
	ruralPopulation: number;
	urbanPopulation: number;
	relations: Record<string, string>;
	biomesCells: Record<string, number>;
	culturesCells: Record<string, number>;
	religionsCells: Record<string, number>;
}

export interface mapExtractedCultures {
	name: string;
	color: string;
	cells: number;
	type: string;
	population: number;
	namesbase: string;
}

export interface mapExtractedReligions {
	name: string;
	type: string;
	form: string;
	supremeDeity: string;
	color: string;
	cells: number;
	ruralPopulation: number;
	urbanPopulation: number;
}

export interface mapExtractedProvinces {
	name: string;
	nameFull: string;
	form: string;
	state: string;
	color: string;
	capital: string;
	burgs: number;
	cells: number;
	ruralPopulation: number;
	urbanPopulation: number;
}

export interface mapExtractedBurgs {
	name: string;
	culture: string;
	religion: string;
	state: string;
	province: string;
	population: number;
	isPort: boolean;
	isCitadel: boolean;
	isPlaza: boolean;
	isWalls: boolean;
	isShantyTown: boolean;
	isTemple: boolean;
}
