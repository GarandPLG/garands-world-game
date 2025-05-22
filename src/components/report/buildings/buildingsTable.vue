<script lang="ts" setup>
const technologie = ref<number>(1);
const buildings = useFetchBuildings(technologie);

console.log(buildings.value);
</script>

<template>
	<div>
		<!-- <p>Tablica budynków</p> -->
		<Table class="h-full w-full">
			<TableCaption> </TableCaption>

			<TableHeader>
				<TableRow>
					<TableHead class="text-center"> Nazwa </TableHead>

					<TableHead class="text-center"> Początkowa ilość </TableHead>

					<TableHead class="text-center"> Zbudowane/rozebrane </TableHead>

					<TableHead class="text-center"> Produkcja </TableHead>

					<TableHead class="text-center"> Zapotrzebowanie </TableHead>

					<TableHead class="text-center"> Zatrudnienie </TableHead>

					<TableHead class="text-center"> Koszta budowy / zburzenia </TableHead>

					<TableHead class="text-center"> Tier </TableHead>
				</TableRow>
			</TableHeader>

			<TableBody class="h-full">
				<TableRow
					class="h-full cursor-pointer"
					v-for="[key, building] in buildings.entries()"
					:key="key"
				>
					<TableCell class="text-center">
						{{ building.translation }}
						<!-- <TooltipProvider>
							<Tooltip>
								<TooltipTrigger as-child>
									<Icon :icon="building.icon" :width="'52'" :height="'52'" class="text-primary" />
								</TooltipTrigger>

								<TooltipContent>
									<p class="text-center">
										{{ building.translation }}
									</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider> -->
					</TableCell>

					<TableCell class="text-center"> </TableCell>

					<TableCell class="text-center"> </TableCell>

					<TableCell class="text-center"> </TableCell>

					<TableCell class="text-center"> </TableCell>

					<TableCell class="text-center"> </TableCell>

					<TableCell class="text-center"> </TableCell>

					<TableCell class="text-center"> </TableCell>
				</TableRow>
			</TableBody>
		</Table>
	</div>
</template>
