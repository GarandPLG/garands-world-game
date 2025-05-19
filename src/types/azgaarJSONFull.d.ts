export interface AzgaarJSONFull {
	info: Info;
	settings: Settings;
	mapCoordinates: MapCoordinates;
	pack: Pack;
	grid: Grid;
	biomesData: BiomesData;
	notes: Note[];
	nameBases: NameBase[];
}

export interface BiomesData {
	i: number[];
	name: string[];
	color: string[];
	biomesMartix: { [key: string]: number }[];
	habitability: number[];
	iconsDensity: number[];
	icons: Array<string[]>;
	cost: number[];
}

export interface Grid {
	cells: GridCell[];
	vertices: Vertex[];
	cellsDesired: number;
	spacing: number;
	cellsY: number;
	cellsX: number;
	points: Array<number[]>;
	boundary: Array<number[]>;
	features: Array<FeatureClass | number>;
}

export interface GridCell {
	i: number;
	v: number[];
	c: number[];
	b: number;
	f: number;
	t: number;
	h: number;
	temp: number;
	prec: number;
}

export interface FeatureClass {
	i: number;
	type: FeatureType;
	land: boolean;
	border: boolean;
	cells: number;
	firstCell: number;
	vertices: number[];
	area: number;
	group?: FeatureGroup;
	shoreline?: number[];
	height?: number;
	flux?: number;
	temp?: number;
	evaporation?: number;
	name?: string;
	outlet?: number;
	inlets?: number[];
}

export enum FeatureGroup {
	Continent = 'continent',
	Freshwater = 'freshwater',
	Island = 'island',
	Isle = 'isle',
	LakeIsland = 'lake_island'
}

export enum FeatureType {
	Island = 'island',
	Lake = 'lake',
	Ocean = 'ocean'
}

export interface Vertex {
	i: number;
	p: number[];
	v: number[];
	c: number[];
}

export interface Info {
	version: string;
	description: string;
	exportedAt: Date;
	mapName: string;
	width: number;
	height: number;
	seed: string;
	mapId: number;
}

export interface MapCoordinates {
	latT: number;
	latN: number;
	latS: number;
	lonT: number;
	lonW: number;
	lonE: number;
}

export interface NameBase {
	name: string;
	min: string;
	max: string;
	d: string;
	m: string;
	b: string;
}

export interface Note {
	id: string;
	name: string;
	legend: string;
}

export interface Pack {
	cells: PackCell[];
	vertices: Vertex[];
	features: Array<FeatureClass | number>;
	cultures: Culture[];
	burgs: Array<BurgClass | number>;
	states: State[];
	provinces: Array<ProvinceClass | number>;
	religions: Religion[];
	rivers: River[];
	markers: Marker[];
	routes: Route[];
	zones: Zone[];
}

export interface BurgClass {
	cell: number;
	x: number;
	y: number;
	state: number;
	i: number;
	culture: number;
	name: string;
	capital: number;
	feature: number;
	port: number;
	population: number;
	type: BurgType;
	coa?: BurgCoa;
	citadel: number;
	plaza: number;
	walls: number;
	shanty: number;
	temple: number;
	removed?: boolean;
}

export interface BurgCoa {
	t1: string;
	charges?: Charge[];
	shield: Shield;
	division?: DivisionClass;
	ordinaries?: Ordinary[];
}

export interface Charge {
	charge: string;
	t: T1;
	p: string;
	t2?: T1;
	t3?: T1;
	size: number;
	divided?: Divided;
	sinister?: number;
	reversed?: number;
}

export enum Divided {
	Counter = 'counter'
}

export enum T1 {
	Argent = 'argent',
	Azure = 'azure',
	BarryAzureArgent = 'barry-azure-argent',
	BendyArgentGules = 'bendy-argent-gules',
	Gules = 'gules',
	Or = 'or',
	Purpure = 'purpure',
	Sable = 'sable',
	Vert = 'vert'
}

export interface DivisionClass {
	division: DivisionEnum;
	t: string;
	line?: string;
}

export enum DivisionEnum {
	Chevronny = 'chevronny',
	Gyronny = 'gyronny',
	PerBend = 'perBend',
	PerBendSinister = 'perBendSinister',
	PerChevron = 'perChevron',
	PerChevronReversed = 'perChevronReversed',
	PerCross = 'perCross',
	PerFess = 'perFess',
	PerPale = 'perPale',
	PerPile = 'perPile',
	PerSaltire = 'perSaltire'
}

export interface Ordinary {
	ordinary: string;
	t: T1;
	line?: string;
	divided?: string;
}

export enum Shield {
	Flag = 'flag'
}

export enum BurgType {
	Generic = 'Generic',
	Highland = 'Highland',
	Hunting = 'Hunting',
	Lake = 'Lake',
	Naval = 'Naval',
	Nomadic = 'Nomadic',
	River = 'River'
}

export interface PackCell {
	i: number;
	v: number[];
	c: number[];
	p: number[];
	g: number;
	h: number;
	area: number;
	f: number;
	t: number;
	haven: number;
	harbor: number;
	fl: number;
	r: number;
	conf: number;
	biome: number;
	s: number;
	pop: number;
	culture: number;
	burg: number;
	state: number;
	religion: number;
	province: number;
	routes?: { [key: string]: number };
}

export interface Culture {
	name: string;
	i: number;
	base: number;
	origins: Array<number | null>;
	shield?: string;
	urban: number;
	rural: number;
	area: number;
	cells: number;
	center?: number;
	color?: string;
	type?: BurgType;
	expansionism?: number;
	code?: string;
	x?: number;
	y?: number;
	removed?: boolean;
	lock?: boolean;
}

export interface Marker {
	icon: string;
	type: string;
	dx?: number;
	px?: number;
	x: number;
	y: number;
	cell: number;
	i: number;
	dy?: number;
}

export interface ProvinceClass {
	i: number;
	state: number;
	center: number;
	burg: number;
	name: string;
	formName: string;
	fullName: string;
	color: string;
	coa: BurgCoa;
	pole: number[];
	urban: number;
	rural: number;
	area: number;
	burgs: number[];
}

export interface Religion {
	name: string;
	i: number;
	origins: number[] | null;
	urban: number;
	rural: number;
	area: number;
	cells: number;
	type?: ReligionType;
	form?: string;
	culture?: number;
	center?: number;
	deity?: null | string;
	expansion?: Expansion;
	expansionism?: number;
	color?: string;
	code?: string;
	removed?: boolean;
	lock?: boolean;
}

export enum Expansion {
	Culture = 'culture',
	Global = 'global',
	State = 'state'
}

export enum ReligionType {
	Cult = 'Cult',
	Folk = 'Folk',
	Heresy = 'Heresy',
	Organized = 'Organized'
}

export interface River {
	i: number;
	source: number;
	mouth: number;
	discharge: number;
	length: number;
	width: number;
	widthFactor: number;
	sourceWidth: number;
	parent: number;
	cells: number[];
	basin: number;
	name: string;
	type: RiverType;
	points?: Array<number[]>;
}

export enum RiverType {
	Branch = 'Branch',
	Brook = 'Brook',
	Creek = 'Creek',
	Fork = 'Fork',
	River = 'River',
	Stream = 'Stream'
}

export interface Route {
	i: number;
	group: RouteGroup;
	feature: number;
	points: Array<number[]>;
	name?: string;
	length?: number;
}

export enum RouteGroup {
	Roads = 'roads',
	Searoutes = 'searoutes',
	Trails = 'trails'
}

export interface State {
	i: number;
	name?: string;
	urban?: number;
	rural?: number;
	burgs?: number;
	area?: number;
	cells?: number;
	neighbors?: number[];
	diplomacy?: Array<string[] | DiplomacyEnum>;
	provinces: number[];
	removed?: boolean;
	color?: string;
	expansionism?: number;
	capital?: number;
	type?: BurgType;
	center?: number;
	culture?: number;
	military?: any[];
	alert?: number;
	coa?: StateCoa;
	pole?: number[];
	form?: string;
	formName?: string;
	fullName?: string;
	lock?: boolean;
}

export interface StateCoa {
	custom?: boolean;
	t1?: T1;
	ordinaries?: Ordinary[];
	charges?: Charge[];
	shield?: Shield;
}

export enum DiplomacyEnum {
	Ally = 'Ally',
	Enemy = 'Enemy',
	Friendly = 'Friendly',
	Neutral = 'Neutral',
	Rival = 'Rival',
	Suspicion = 'Suspicion',
	X = 'x'
}

export interface Zone {
	i: number;
	name: string;
	type: string;
	color: string;
	cells: number[];
}

export interface Settings {
	distanceUnit: string;
	distanceScale: string;
	areaUnit: string;
	heightUnit: string;
	heightExponent: string;
	temperatureScale: string;
	populationRate: string;
	urbanization: string;
	mapSize: string;
	latitude: string;
	longitude: string;
	prec: string;
	options: Options;
	mapName: string;
	hideLabels: boolean;
	stylePreset: string;
	rescaleLabels: boolean;
	urbanDensity: number;
}

export interface Options {
	pinNotes: boolean;
	winds: number[];
	temperatureEquator: number;
	temperatureNorthPole: number;
	temperatureSouthPole: number;
	stateLabelsMode: string;
	showBurgPreview: boolean;
	villageMaxPopulation: number;
	year: number;
	era: string;
	eraShort: string;
	military: Military[];
}

export interface Military {
	icon: string;
	name: string;
	rural: number;
	urban: number;
	crew: number;
	power: number;
	type: string;
	separate: number;
}
