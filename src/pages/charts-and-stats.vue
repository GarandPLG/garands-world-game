<script setup lang="ts">
useHead({
	title: "Garand's WG | Wykresy i statystyki"
});
const pb = usePocketBase();

// TODO: dodać wykresy z shadcn-vue https://www.shadcn-vue.com/docs/charts.html

// TODO: Statystyki państw na przestrzeni tur, kolor z pola color:
//       - ilość miast - liniowy,
//       - ilość prowincji - liniowy,
//       - ilość kratek - liniowy,
//       - ilość prowincji danej kultury - słupkowy,
//       - ilość prowincji danej religii - słupkowy,
//       - ilość prowincji danego biomu - słupkowy,z
//       - ilość populacji wiejskiej - liniowy,
//       - ilość populacji miejskiej - liniowy,
//       - ilość danych form rządu - liniowy

// TODO: Statystyki prowincji na przestrzeni tur, kolor z pola color:
//       - ilość miast - liniowy,
//       - ilość kratek - liniowy,
//       - ilość populacji wiejskiej - liniowy,
//       - ilość populacji miejskiej - liniowy,
//       - ilość danych form rządu - liniowy

// TODO: Statystyki miast na przestrzeni tur, kolor z pola color:
//       - ilość populacji - liniowy,
//       - ilość religii - liniowy,
//       - ilość kultur - liniowy,
//       - ilość stolic - liniowy,
//       - ilość portów - liniowy,
//       - ilość zamków - liniowy,
//       - ilość murów - liniowy,
//       - ilość placów - liniowy,
//       - ilość świątyń - liniowy,
//       - ilość przedmieść - liniowy

// TODO: Statystyki kultur na przestrzeni tur, kolor z pola color:
//       - ilość kratek - liniowy,
//       - ilość populacji - liniowy,
//       - ilość danych typów kultury - liniowy,
//       - ilość danych namesbase'ów kultury - liniowy,

// TODO: Statystyki religii na przestrzeni tur, kolor z pola color:
//       - ilość kratek - liniowy,
//       - ilość populacji - liniowy,
//       - ilość danych typów religii - liniowy,
//       - ilość danych form religii - liniowy,

const tabs: { [key: string]: string } = {
	states: 'Państwa',
	provinces: 'Prowincje',
	burgs: 'Miasta',
	cultures: 'Kultury',
	religions: 'Religie'
};
</script>

<template>
	<div class="mt-12 flex h-screen items-center justify-center">
		<Tabs
			class="flex w-full flex-col items-center justify-center"
			:default-value="tabs[Object.keys(tabs)[0]]"
		>
			<TabsList class="w-full items-center justify-center">
				<TabsTrigger v-for="(tab, key) in tabs" :key="key" :value="tab"> {{ tab }}</TabsTrigger>
			</TabsList>

			<TabsContent
				v-for="(tab, key) in tabs"
				:key="key"
				:value="tab"
				class="h-screen w-full flex-col items-center justify-center"
			>
				<Card>
					<CardHeader>
						<CardTitle>
							{{ tab }}
							<!-- {{ props.title }} Numer <span class="text-primary">{{ turn.value }}</span> -->
						</CardTitle>

						<CardDescription> Jeżyk </CardDescription>
					</CardHeader>

					<Separator />

					<CardContent class="space-y-2 py-6"> </CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	</div>
</template>
