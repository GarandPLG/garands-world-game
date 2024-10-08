/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Biomes = "biomes",
	Maps = "maps",
	Religions = "religions",
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

export type BiomesRecord = {
	coldDesert: number
	glacier: number
	grassland: number
	hotDesert: number
	savanna: number
	taiga: number
	temperateDeciduousForest: number
	temperateRainforest: number
	tropicalRainforest: number
	tropicalSeasonalForest: number
	tundra: number
	turn: number
	wetland: number
}

export type MapsRecord = {
	map?: string
}

export enum ReligionsTypeOptions {
	"Folk" = "Folk",
	"Organized" = "Organized",
	"Cult" = "Cult",
	"Heresy" = "Heresy",
}
export type ReligionsRecord = {
	color: string
	form: string
	name: string
	population: number
	supremeDeity: string
	type?: ReligionsTypeOptions
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
export type BiomesResponse<Texpand = unknown> = Required<BiomesRecord> & BaseSystemFields<Texpand>
export type MapsResponse<Texpand = unknown> = Required<MapsRecord> & BaseSystemFields<Texpand>
export type ReligionsResponse<Texpand = unknown> = Required<ReligionsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	biomes: BiomesRecord
	maps: MapsRecord
	religions: ReligionsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	biomes: BiomesResponse
	maps: MapsResponse
	religions: ReligionsResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'biomes'): RecordService<BiomesResponse>
	collection(idOrName: 'maps'): RecordService<MapsResponse>
	collection(idOrName: 'religions'): RecordService<ReligionsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
