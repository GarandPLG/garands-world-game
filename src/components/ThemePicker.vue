<script lang="ts" setup>
import { setGlobalColorTheme, themes } from '@/lib/theme-colors';
import { radiuses, setGlobalRadius } from '@/lib/theme-radius';
import type { ThemeColors, ThemeRadiuses } from '@/types/theme-types';
import { Icon } from '@iconify/vue';

const { currentColorTheme, currentRadius } = storeToRefs(useThemeStore());
const { clearThemeStore, saveThemeStore } = useThemeStore();
const mode = useColorMode();
const { toast } = useToast();

type Mode = Exclude<typeof mode.value, 'auto'>;

function handleSaveClick(): void {
	saveThemeStore();
	toast({
		title: 'Zapisano preferencje!'
	});
}

function handleClearClick(): void {
	clearThemeStore();
	setGlobalColorTheme(mode.value as Mode, 'Zinc');
	setGlobalRadius('0.5');
	currentColorTheme.value = 'Zinc';
	currentRadius.value = '0.5';
	toast({
		title: 'Wyczyszczono preferencje!'
	});
}

function handleColorThemeClick(key: ThemeColors, mode: 'light' | 'dark' | 'auto'): void {
	currentColorTheme.value = key;
	setGlobalColorTheme(mode as Exclude<typeof mode, 'auto'>, key);
}

function handleRadiusClick(key: ThemeRadiuses): void {
	currentRadius.value = key;
	setGlobalRadius(key);
}

function handleColorModeClick(themeColors: ThemeColors): void {
	mode.value = mode.value === 'light' ? 'dark' : 'light';
	setGlobalColorTheme(mode.value as Mode, themeColors);
}
</script>

<template>
	<div class="flex flex-col gap-2 p-1">
		<Label>Kolor</Label>

		<RadioGroup :default-value="currentColorTheme" class="grid grid-cols-3 gap-2">
			<div v-for="(_, key) of themes" :key="key">
				<RadioGroupItem
					:id="key"
					:value="key"
					class="peer sr-only"
					@click="handleColorThemeClick(key, mode)"
				/>

				<Label
					:for="key"
					class="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
				>
					{{ key }}
				</Label>
			</div>
		</RadioGroup>

		<Separator />

		<Label>Krawędzie</Label>

		<RadioGroup :default-value="currentRadius" class="grid grid-cols-5 gap-2">
			<div v-for="(_, key) of radiuses" :key="key">
				<RadioGroupItem
					:id="key"
					:value="key"
					class="peer sr-only"
					@click="handleRadiusClick(key)"
				/>

				<Label
					:for="key"
					class="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
				>
					{{ key }}
				</Label>
			</div>
		</RadioGroup>

		<Separator />

		<Label>Motyw</Label>

		<Button variant="outline" @click="handleColorModeClick(currentColorTheme)">
			<Icon
				icon="radix-icons:moon"
				class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
			/>

			<Icon
				icon="radix-icons:sun"
				class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
			/>
			<span class="sr-only">Toggle theme</span>
		</Button>

		<Separator />

		<div class="flex items-center justify-between gap-4">
			<Button class="w-full" @click="handleClearClick">Wyczyść</Button>
			<Button class="w-full" @click="handleSaveClick">Zapisz</Button>
		</div>
	</div>
</template>
