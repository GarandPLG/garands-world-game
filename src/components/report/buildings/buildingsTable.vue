<script lang="ts" setup>
const technologie = ref<number>(1);
const buildings = useBuildings(technologie);

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
				<TableRow class="h-full cursor-pointer">
					<TableCell class="text-center"> </TableCell>

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
