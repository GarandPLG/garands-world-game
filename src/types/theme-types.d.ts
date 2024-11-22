export type ThemeColors =
	| 'Zinc'
	| 'Rose'
	| 'Blue'
	| 'Green'
	| 'Orange'
	| 'Red'
	| 'Slate'
	| 'Stone'
	| 'Gray'
	| 'Neutral'
	| 'Yellow'
	| 'Violet';

export type Theme = Record<ThemeColors, ThemeVariants>;

export interface ThemeVariants {
	light: ThemeVariables;
	dark: ThemeVariables;
}

export interface ThemeVariables {
	'--background': string;
	'--foreground': string;
	'--card': string;
	'--card-foreground': string;
	'--popover': string;
	'--popover-foreground': string;
	'--primary': string;
	'--primary-foreground': string;
	'--secondary': string;
	'--secondary-foreground': string;
	'--muted': string;
	'--muted-foreground': string;
	'--accent': string;
	'--accent-foreground': string;
	'--destructive': string;
	'--destructive-foreground': string;
	'--border': string;
	'--input': string;
	'--ring': string;
}

export type ThemeRadiuses = '0' | '0.25' | '0.5' | '0.75' | '1';

export type Radius = Record<ThemeRadiuses, string>;
