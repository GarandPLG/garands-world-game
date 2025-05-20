/**
 * This file was @generated using pocketbase-typegen
 */

import type PocketBase from 'pocketbase';
import type { RecordService } from 'pocketbase';

export enum Collections {
	Authorigins = '_authOrigins',
	Externalauths = '_externalAuths',
	Mfas = '_mfas',
	Otps = '_otps',
	Superusers = '_superusers',
	Burgs = 'burgs',
	Cultures = 'cultures',
	Maps = 'maps',
	Provinces = 'provinces',
	Religions = 'religions',
	ReportInputs = 'reportInputs',
	ReportOutputs = 'reportOutputs',
	Reports = 'reports',
	States = 'states',
	Trades = 'trades',
	Turns = 'turns',
	Users = 'users'
}

// Alias types for improved usability
export type IsoDateString = string;
export type RecordIdString = string;
export type HTMLString = string;

type ExpandType<T> = unknown extends T
	? T extends unknown
		? { expand?: unknown }
		: { expand: T }
	: { expand: T };

// System fields
export type BaseSystemFields<T = unknown> = {
	id: RecordIdString;
	collectionId: string;
	collectionName: Collections;
} & ExpandType<T>;

export type AuthSystemFields<T = unknown> = {
	email: string;
	emailVisibility: boolean;
	username: string;
	verified: boolean;
} & BaseSystemFields<T>;

// Record types for each collection

export type AuthoriginsRecord = {
	collectionRef: string;
	created?: IsoDateString;
	fingerprint: string;
	id: string;
	recordRef: string;
	updated?: IsoDateString;
};

export type ExternalauthsRecord = {
	collectionRef: string;
	created?: IsoDateString;
	id: string;
	provider: string;
	providerId: string;
	recordRef: string;
	updated?: IsoDateString;
};

export type MfasRecord = {
	collectionRef: string;
	created?: IsoDateString;
	id: string;
	method: string;
	recordRef: string;
	updated?: IsoDateString;
};

export type OtpsRecord = {
	collectionRef: string;
	created?: IsoDateString;
	id: string;
	password: string;
	recordRef: string;
	sentTo?: string;
	updated?: IsoDateString;
};

export type SuperusersRecord = {
	created?: IsoDateString;
	email: string;
	emailVisibility?: boolean;
	id: string;
	password: string;
	tokenKey: string;
	updated?: IsoDateString;
	verified?: boolean;
};

export type BurgsRecord = {
	cityGeneratorLink?: string;
	created?: IsoDateString;
	culture: RecordIdString;
	emblemSVG?: string;
	id: string;
	isCitadel?: boolean;
	isPlaza?: boolean;
	isPort?: boolean;
	isShantyTown?: boolean;
	isTemple?: boolean;
	isWalls?: boolean;
	name: string;
	population?: number;
	province?: RecordIdString;
	religion: RecordIdString;
	state: RecordIdString;
	turn: RecordIdString;
	updated?: IsoDateString;
};

export enum CulturesTypeOptions {
	'Generic, River, Lake, Naval, Nomadic, Hunting, Highland' = 'Generic, River, Lake, Naval, Nomadic, Hunting, Highland'
}

export enum CulturesNamesbaseOptions {
	'German, English, French, Italian, Castillian, Ruthenian, Nordic, Greek, Roman, Finnic, Korean, Chinese, Japanese, Portuguese, Nahuatl, Hungarian, Turkish, Berber, Arabic, Inuit, Basque, Nigerian, Celtic, Mesopotamian, Iranian, Hawaiian, Karnataka, Quechua, Swahili, Vietnamese, Cantonese, Mongolian, Human Generic, Elven, Dark Elven, Dwarven, Goblin, Orc, Giant, Draconic, Arachnid, Serpents, Levantine' = 'German, English, French, Italian, Castillian, Ruthenian, Nordic, Greek, Roman, Finnic, Korean, Chinese, Japanese, Portuguese, Nahuatl, Hungarian, Turkish, Berber, Arabic, Inuit, Basque, Nigerian, Celtic, Mesopotamian, Iranian, Hawaiian, Karnataka, Quechua, Swahili, Vietnamese, Cantonese, Mongolian, Human Generic, Elven, Dark Elven, Dwarven, Goblin, Orc, Giant, Draconic, Arachnid, Serpents, Levantine'
}
export type CulturesRecord = {
	cells?: number;
	color?: string;
	created?: IsoDateString;
	id: string;
	name: string;
	namesbase: CulturesNamesbaseOptions;
	population?: number;
	turn: RecordIdString;
	type?: CulturesTypeOptions;
	updated?: IsoDateString;
};

export type MapsRecord = {
	created?: IsoDateString;
	id: string;
	map: string;
	name: string;
	turn?: RecordIdString;
	updated?: IsoDateString;
};

export enum ProvincesFormOptions {
	'Area, Autonomy, Barony, Canton, Captaincy, Chiefdom, Clan, Colony, Council, County, Deanery, Department, Dependency, Diaconate, District, Earldom, Governorate, Island, Islands, Land, Landgrave, Mandate, Margrave, Municipality, Occupation zone, Parish, Prefecture, Province, Region, Republic, Reservation, Seneschalty, Shire, State, Territory, Tribe' = 'Area, Autonomy, Barony, Canton, Captaincy, Chiefdom, Clan, Colony, Council, County, Deanery, Department, Dependency, Diaconate, District, Earldom, Governorate, Island, Islands, Land, Landgrave, Mandate, Margrave, Municipality, Occupation zone, Parish, Prefecture, Province, Region, Republic, Reservation, Seneschalty, Shire, State, Territory, Tribe'
}
export type ProvincesRecord = {
	burgs?: number;
	capital?: string;
	cells?: number;
	color: string;
	created?: IsoDateString;
	emblemSVG?: string;
	form: ProvincesFormOptions;
	id: string;
	name: string;
	nameFull: string;
	ruralPopulation?: number;
	state: RecordIdString;
	turn: RecordIdString;
	updated?: IsoDateString;
	urbanPopulation?: number;
};

export enum ReligionsTypeOptions {
	'Organized, Heresy, Cult, Folk' = 'Organized, Heresy, Cult, Folk'
}
export type ReligionsRecord = {
	cells?: number;
	color?: string;
	created?: IsoDateString;
	form?: string;
	id: string;
	name: string;
	ruralPopulation?: number;
	supremeDeity?: string;
	turn: RecordIdString;
	type?: ReligionsTypeOptions;
	updated?: IsoDateString;
	urbanPopulation?: number;
};

export type ReportInputsRecord = {
	created?: IsoDateString;
	id: string;
	placeHolder?: string;
	updated?: IsoDateString;
};

export type ReportOutputsRecord = {
	created?: IsoDateString;
	id: string;
	placeHolder?: string;
	updated?: IsoDateString;
};

export type ReportsRecord = {
	created?: IsoDateString;
	id: string;
	reportInput: RecordIdString;
	reportOutput: RecordIdString;
	state: RecordIdString;
	turn: RecordIdString;
	updated?: IsoDateString;
};

export enum StatesFormOptions {
	'Beylik, Despotate, Dominion, Duchy, Emirate, Empire, Horde, Grand Duchy, Heptarchy, Khaganate, Khanate, Kingdom, Marches, Principality, Satrapy, Shogunate, Sultanate, Tsardom, Ulus, Viceroyalty, Chancellery, City-state, Diarchy, Federation, Free City, Most Serene Republic, Oligarchy, Protectorate, Republic, Tetrarchy, Trade Company, Triumvirate, Confederacy, Confederation, Conglomerate, Commonwealth, League, Union, United Hordes, United Kingdom, United Provinces, United Republic, United States, United Tribes, Bishopric, Brotherhood, Caliphate, Diocese, Divine Duchy, Divine Grand Duchy, Divine Principality, Divine Kingdom, Divine Empire, Eparchy, Exarchate, Holy State, Imamah, Patriarchate, Theocracy, Commune, Community, Council, Free Territory, Tribes' = 'Beylik, Despotate, Dominion, Duchy, Emirate, Empire, Horde, Grand Duchy, Heptarchy, Khaganate, Khanate, Kingdom, Marches, Principality, Satrapy, Shogunate, Sultanate, Tsardom, Ulus, Viceroyalty, Chancellery, City-state, Diarchy, Federation, Free City, Most Serene Republic, Oligarchy, Protectorate, Republic, Tetrarchy, Trade Company, Triumvirate, Confederacy, Confederation, Conglomerate, Commonwealth, League, Union, United Hordes, United Kingdom, United Provinces, United Republic, United States, United Tribes, Bishopric, Brotherhood, Caliphate, Diocese, Divine Duchy, Divine Grand Duchy, Divine Principality, Divine Kingdom, Divine Empire, Eparchy, Exarchate, Holy State, Imamah, Patriarchate, Theocracy, Commune, Community, Council, Free Territory, Tribes'
}
export type StatesRecord<
	TbiomesCells = unknown,
	TculturesCells = unknown,
	Trelations = unknown,
	TreligionsCells = unknown
> = {
	biomesCells?: null | TbiomesCells;
	burgs?: number;
	capital?: string;
	cells?: number;
	color?: string;
	created?: IsoDateString;
	culture?: RecordIdString;
	culturesCells?: null | TculturesCells;
	emblemSVG?: string;
	form?: StatesFormOptions;
	id: string;
	name: string;
	nameFull?: string;
	provinces?: number;
	relations?: null | Trelations;
	religionsCells?: null | TreligionsCells;
	ruralPopulation?: number;
	turn: RecordIdString;
	updated?: IsoDateString;
	urbanPopulation?: number;
	user?: RecordIdString;
};

export enum TradesProductOptions {
	'Groceries, Clothes, Furniture, Fish, Fabrics, Grain, Paper, Wood, Iron, Tools, Dyes, Glass, Silk, Coffee, Fruit, Gold, Alcohol, LuxuryClothes, LuxuryFurniture, Meat, Sugar, Tea, Weapon, RangedWeapon, Armor, SiegeEquipment, Ships' = 'Groceries, Clothes, Furniture, Fish, Fabrics, Grain, Paper, Wood, Iron, Tools, Dyes, Glass, Silk, Coffee, Fruit, Gold, Alcohol, LuxuryClothes, LuxuryFurniture, Meat, Sugar, Tea, Weapon, RangedWeapon, Armor, SiegeEquipment, Ships'
}
export type TradesRecord = {
	created?: IsoDateString;
	exportState: RecordIdString;
	id: string;
	importState: RecordIdString;
	isDiscontinued?: boolean;
	price: number;
	product: TradesProductOptions;
	turn: RecordIdString;
	updated?: IsoDateString;
	volume: number;
};

export type TurnsRecord = {
	created?: IsoDateString;
	id: string;
	updated?: IsoDateString;
	value?: number;
};

export enum UsersRoleOptions {
	'user, moderator, admin' = 'user, moderator, admin'
}
export type UsersRecord = {
	avatar?: string;
	created?: IsoDateString;
	email: string;
	emailVisibility?: boolean;
	id: string;
	name?: string;
	password: string;
	role: UsersRoleOptions;
	tokenKey: string;
	updated?: IsoDateString;
	verified?: boolean;
};

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> &
	BaseSystemFields<Texpand>;
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> &
	BaseSystemFields<Texpand>;
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>;
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>;
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> &
	AuthSystemFields<Texpand>;
export type BurgsResponse<Texpand = unknown> = Required<BurgsRecord> & BaseSystemFields<Texpand>;
export type CulturesResponse<Texpand = unknown> = Required<CulturesRecord> &
	BaseSystemFields<Texpand>;
export type MapsResponse<Texpand = unknown> = Required<MapsRecord> & BaseSystemFields<Texpand>;
export type ProvincesResponse<Texpand = unknown> = Required<ProvincesRecord> &
	BaseSystemFields<Texpand>;
export type ReligionsResponse<Texpand = unknown> = Required<ReligionsRecord> &
	BaseSystemFields<Texpand>;
export type ReportInputsResponse<Texpand = unknown> = Required<ReportInputsRecord> &
	BaseSystemFields<Texpand>;
export type ReportOutputsResponse<Texpand = unknown> = Required<ReportOutputsRecord> &
	BaseSystemFields<Texpand>;
export type ReportsResponse<Texpand = unknown> = Required<ReportsRecord> &
	BaseSystemFields<Texpand>;
export type StatesResponse<
	TbiomesCells = unknown,
	TculturesCells = unknown,
	Trelations = unknown,
	TreligionsCells = unknown,
	Texpand = unknown
> = Required<StatesRecord<TbiomesCells, TculturesCells, Trelations, TreligionsCells>> &
	BaseSystemFields<Texpand>;
export type TradesResponse<Texpand = unknown> = Required<TradesRecord> & BaseSystemFields<Texpand>;
export type TurnsResponse<Texpand = unknown> = Required<TurnsRecord> & BaseSystemFields<Texpand>;
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>;

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	_authOrigins: AuthoriginsRecord;
	_externalAuths: ExternalauthsRecord;
	_mfas: MfasRecord;
	_otps: OtpsRecord;
	_superusers: SuperusersRecord;
	burgs: BurgsRecord;
	cultures: CulturesRecord;
	maps: MapsRecord;
	provinces: ProvincesRecord;
	religions: ReligionsRecord;
	reportInputs: ReportInputsRecord;
	reportOutputs: ReportOutputsRecord;
	reports: ReportsRecord;
	states: StatesRecord;
	trades: TradesRecord;
	turns: TurnsRecord;
	users: UsersRecord;
};

export type CollectionResponses = {
	_authOrigins: AuthoriginsResponse;
	_externalAuths: ExternalauthsResponse;
	_mfas: MfasResponse;
	_otps: OtpsResponse;
	_superusers: SuperusersResponse;
	burgs: BurgsResponse;
	cultures: CulturesResponse;
	maps: MapsResponse;
	provinces: ProvincesResponse;
	religions: ReligionsResponse;
	reportInputs: ReportInputsResponse;
	reportOutputs: ReportOutputsResponse;
	reports: ReportsResponse;
	states: StatesResponse;
	trades: TradesResponse;
	turns: TurnsResponse;
	users: UsersResponse;
};

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: '_authOrigins'): RecordService<AuthoriginsResponse>;
	collection(idOrName: '_externalAuths'): RecordService<ExternalauthsResponse>;
	collection(idOrName: '_mfas'): RecordService<MfasResponse>;
	collection(idOrName: '_otps'): RecordService<OtpsResponse>;
	collection(idOrName: '_superusers'): RecordService<SuperusersResponse>;
	collection(idOrName: 'burgs'): RecordService<BurgsResponse>;
	collection(idOrName: 'cultures'): RecordService<CulturesResponse>;
	collection(idOrName: 'maps'): RecordService<MapsResponse>;
	collection(idOrName: 'provinces'): RecordService<ProvincesResponse>;
	collection(idOrName: 'religions'): RecordService<ReligionsResponse>;
	collection(idOrName: 'reportInputs'): RecordService<ReportInputsResponse>;
	collection(idOrName: 'reportOutputs'): RecordService<ReportOutputsResponse>;
	collection(idOrName: 'reports'): RecordService<ReportsResponse>;
	collection(idOrName: 'states'): RecordService<StatesResponse>;
	collection(idOrName: 'trades'): RecordService<TradesResponse>;
	collection(idOrName: 'turns'): RecordService<TurnsResponse>;
	collection(idOrName: 'users'): RecordService<UsersResponse>;
};
