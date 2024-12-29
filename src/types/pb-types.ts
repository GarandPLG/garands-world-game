/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Burgs = "burgs",
	Cultures = "cultures",
	Maps = "maps",
	Provinces = "provinces",
	Religions = "religions",
	ReportInputs = "reportInputs",
	ReportOutputs = "reportOutputs",
	Reports = "reports",
	States = "states",
	Turns = "turns",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type BurgsRecord = {
	cityGeneratorLink: string
	culture: RecordIdString
	emblemSVG?: string
	isCapital?: boolean
	isCitadel?: boolean
	isPlaza?: boolean
	isPort?: boolean
	isShantyTown?: boolean
	isTemple?: boolean
	isWalls?: boolean
	name: string
	population?: number
	province?: RecordIdString
	religion: RecordIdString
	state: RecordIdString
	turn: RecordIdString
}

export enum CulturesTypeOptions {
	"Generic" = "Generic",
	"River" = "River",
	"Lake" = "Lake",
	"Naval" = "Naval",
	"Nomadic" = "Nomadic",
	"Hunting" = "Hunting",
	"Highland" = "Highland",
}

export enum CulturesNamesbaseOptions {
	"German" = "German",
	"English" = "English",
	"French" = "French",
	"Italian" = "Italian",
	"Castillian" = "Castillian",
	"Ruthenian" = "Ruthenian",
	"Nordic" = "Nordic",
	"Greek" = "Greek",
	"Roman" = "Roman",
	"Finnic" = "Finnic",
	"Korean" = "Korean",
	"Chinese" = "Chinese",
	"Japanese" = "Japanese",
	"Portuguese" = "Portuguese",
	"Nahuatl" = "Nahuatl",
	"Hungarian" = "Hungarian",
	"Turkish" = "Turkish",
	"Berber" = "Berber",
	"Arabic" = "Arabic",
	"Inuit" = "Inuit",
	"Basque" = "Basque",
	"Nigerian" = "Nigerian",
	"Celtic" = "Celtic",
	"Mesopotamian" = "Mesopotamian",
	"Iranian" = "Iranian",
	"Hawaiian" = "Hawaiian",
	"Karnataka" = "Karnataka",
	"Quechua" = "Quechua",
	"Swahili" = "Swahili",
	"Vietnamese" = "Vietnamese",
	"Cantonese" = "Cantonese",
	"Mongolian" = "Mongolian",
	"Human Generic" = "Human Generic",
	"Elven" = "Elven",
	"Dark Elven" = "Dark Elven",
	"Dwarven" = "Dwarven",
	"Goblin" = "Goblin",
	"Orc" = "Orc",
	"Giant" = "Giant",
	"Draconic" = "Draconic",
	"Arachnid" = "Arachnid",
	"Serpents" = "Serpents",
	"Levantine" = "Levantine",
}
export type CulturesRecord = {
	cells?: number
	color?: string
	name: string
	namesbase: CulturesNamesbaseOptions
	population?: number
	turn: RecordIdString
	type?: CulturesTypeOptions
}

export type MapsRecord = {
	file: string
	name: string
	turn?: RecordIdString
}

export enum ProvincesFormOptions {
	"Area" = "Area",
	"Autonomy" = "Autonomy",
	"Barony" = "Barony",
	"Canton" = "Canton",
	"Captaincy" = "Captaincy",
	"Chiefdom" = "Chiefdom",
	"Clan" = "Clan",
	"Colony" = "Colony",
	"Council" = "Council",
	"County" = "County",
	"Deanery" = "Deanery",
	"Department" = "Department",
	"Dependency" = "Dependency",
	"Diaconate" = "Diaconate",
	"District" = "District",
	"Earldom" = "Earldom",
	"Governorate" = "Governorate",
	"Island" = "Island",
	"Islands" = "Islands",
	"Land" = "Land",
	"Landgrave" = "Landgrave",
	"Mandate" = "Mandate",
	"Margrave" = "Margrave",
	"Municipality" = "Municipality",
	"Occupation zone" = "Occupation zone",
	"Parish" = "Parish",
	"Prefecture" = "Prefecture",
	"Province" = "Province",
	"Region" = "Region",
	"Republic" = "Republic",
	"Reservation" = "Reservation",
	"Seneschalty" = "Seneschalty",
	"Shire" = "Shire",
	"State" = "State",
	"Territory" = "Territory",
	"Tribe" = "Tribe",
}
export type ProvincesRecord = {
	burgs?: number
	capital?: string
	cells?: number
	color: string
	emblemSVG?: string
	form: ProvincesFormOptions
	name: string
	nameFull: string
	ruralPopulation?: number
	state: RecordIdString
	turn: RecordIdString
	urbanPopulation?: number
}

export enum ReligionsTypeOptions {
	"Organized" = "Organized",
	"Heresy" = "Heresy",
	"Cult" = "Cult",
	"Folk" = "Folk",
}
export type ReligionsRecord = {
	cells?: number
	color?: string
	form?: string
	name: string
	population?: number
	supremeDeity?: string
	turn: RecordIdString
	type?: ReligionsTypeOptions
}

export type ReportInputsRecord = {
	sdad?: string
}

export type ReportOutputsRecord = {
	sadasds?: string
}

export type ReportsRecord = {
	reportInput: RecordIdString
	reportOutput: RecordIdString
	state: RecordIdString
	turn: RecordIdString
}

export enum StatesFormOptions {
	"Beylik" = "Beylik",
	"Despotate" = "Despotate",
	"Dominion" = "Dominion",
	"Duchy" = "Duchy",
	"Emirate" = "Emirate",
	"Empire" = "Empire",
	"Horde" = "Horde",
	"Grand Duchy" = "Grand Duchy",
	"Heptarchy" = "Heptarchy",
	"Khaganate" = "Khaganate",
	"Khanate" = "Khanate",
	"Kingdom" = "Kingdom",
	"Marches" = "Marches",
	"Principality" = "Principality",
	"Satrapy" = "Satrapy",
	"Shogunate" = "Shogunate",
	"Sultanate" = "Sultanate",
	"Tsardom" = "Tsardom",
	"Ulus" = "Ulus",
	"Viceroyalty" = "Viceroyalty",
	"Chancellery" = "Chancellery",
	"City-state" = "City-state",
	"Diarchy" = "Diarchy",
	"Federation" = "Federation",
	"Free City" = "Free City",
	"Most Serene Republic" = "Most Serene Republic",
	"Oligarchy" = "Oligarchy",
	"Protectorate" = "Protectorate",
	"Republic" = "Republic",
	"Tetrarchy" = "Tetrarchy",
	"Trade Company" = "Trade Company",
	"Triumvirate" = "Triumvirate",
	"Confederacy" = "Confederacy",
	"Confederation" = "Confederation",
	"Conglomerate" = "Conglomerate",
	"Commonwealth" = "Commonwealth",
	"League" = "League",
	"Union" = "Union",
	"United Hordes" = "United Hordes",
	"United Kingdom" = "United Kingdom",
	"United Provinces" = "United Provinces",
	"United Republic" = "United Republic",
	"United States" = "United States",
	"United Tribes" = "United Tribes",
	"Bishopric" = "Bishopric",
	"Brotherhood" = "Brotherhood",
	"Caliphate" = "Caliphate",
	"Diocese" = "Diocese",
	"Divine Duchy" = "Divine Duchy",
	"Divine Grand Duchy" = "Divine Grand Duchy",
	"Divine Principality" = "Divine Principality",
	"Divine Kingdom" = "Divine Kingdom",
	"Divine Empire" = "Divine Empire",
	"Eparchy" = "Eparchy",
	"Exarchate" = "Exarchate",
	"Holy State" = "Holy State",
	"Imamah" = "Imamah",
	"Patriarchate" = "Patriarchate",
	"Theocracy" = "Theocracy",
	"Commune" = "Commune",
	"Community" = "Community",
	"Council" = "Council",
	"Free Territory" = "Free Territory",
	"Tribes" = "Tribes",
}
export type StatesRecord<TbiomesCells = unknown, TculturesCells = unknown, Trelations = unknown, TreligionsCells = unknown> = {
	biomesCells?: null | TbiomesCells
	burgs?: number
	capital?: string
	cells?: number
	color?: string
	culture?: RecordIdString
	culturesCells?: null | TculturesCells
	emblemSVG?: string
	form?: StatesFormOptions
	name: string
	nameFull?: string
	relations?: null | Trelations
	religionsCells?: null | TreligionsCells
	ruralPopulation?: number
	turn: RecordIdString
	urbanPopulation?: number
	user?: RecordIdString
}

export type TurnsRecord = {
	value?: number
}

export enum UsersRoleOptions {
	"user" = "user",
	"moderator" = "moderator",
	"admin" = "admin",
}
export type UsersRecord = {
	avatar?: string
	role: UsersRoleOptions
}

// Response types include system fields and match responses from the PocketBase API
export type BurgsResponse<Texpand = unknown> = Required<BurgsRecord> & BaseSystemFields<Texpand>
export type CulturesResponse<Texpand = unknown> = Required<CulturesRecord> & BaseSystemFields<Texpand>
export type MapsResponse<Texpand = unknown> = Required<MapsRecord> & BaseSystemFields<Texpand>
export type ProvincesResponse<Texpand = unknown> = Required<ProvincesRecord> & BaseSystemFields<Texpand>
export type ReligionsResponse<Texpand = unknown> = Required<ReligionsRecord> & BaseSystemFields<Texpand>
export type ReportInputsResponse<Texpand = unknown> = Required<ReportInputsRecord> & BaseSystemFields<Texpand>
export type ReportOutputsResponse<Texpand = unknown> = Required<ReportOutputsRecord> & BaseSystemFields<Texpand>
export type ReportsResponse<Texpand = unknown> = Required<ReportsRecord> & BaseSystemFields<Texpand>
export type StatesResponse<TbiomesCells = unknown, TculturesCells = unknown, Trelations = unknown, TreligionsCells = unknown, Texpand = unknown> = Required<StatesRecord<TbiomesCells, TculturesCells, Trelations, TreligionsCells>> & BaseSystemFields<Texpand>
export type TurnsResponse<Texpand = unknown> = Required<TurnsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	burgs: BurgsRecord
	cultures: CulturesRecord
	maps: MapsRecord
	provinces: ProvincesRecord
	religions: ReligionsRecord
	reportInputs: ReportInputsRecord
	reportOutputs: ReportOutputsRecord
	reports: ReportsRecord
	states: StatesRecord
	turns: TurnsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	burgs: BurgsResponse
	cultures: CulturesResponse
	maps: MapsResponse
	provinces: ProvincesResponse
	religions: ReligionsResponse
	reportInputs: ReportInputsResponse
	reportOutputs: ReportOutputsResponse
	reports: ReportsResponse
	states: StatesResponse
	turns: TurnsResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'burgs'): RecordService<BurgsResponse>
	collection(idOrName: 'cultures'): RecordService<CulturesResponse>
	collection(idOrName: 'maps'): RecordService<MapsResponse>
	collection(idOrName: 'provinces'): RecordService<ProvincesResponse>
	collection(idOrName: 'religions'): RecordService<ReligionsResponse>
	collection(idOrName: 'reportInputs'): RecordService<ReportInputsResponse>
	collection(idOrName: 'reportOutputs'): RecordService<ReportOutputsResponse>
	collection(idOrName: 'reports'): RecordService<ReportsResponse>
	collection(idOrName: 'states'): RecordService<StatesResponse>
	collection(idOrName: 'turns'): RecordService<TurnsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
