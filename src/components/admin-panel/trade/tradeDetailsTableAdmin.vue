<script lang="ts" setup>
import type { TradesResponse, TurnsResponse } from '@/types/pb-types';
import { X }                                  from 'lucide-vue-next';

defineProps<{
	tradeDeals: TradesResponse<unknown>[];
	turn: TurnsResponse<unknown>;
}>();

const emit = defineEmits<{
	'refresh-table': [];
}>();

const refreshTable = () => {
	emit('refresh-table');
};

const { tradeDealsStates: states } = await useFetchTradeAdminTab();
</script>

<template>
	<Table class="h-full w-full">
		<TableCaption>
			<NewTradeDealForm :turn="turn" :states="states" @trade-added="refreshTable" />
		</TableCaption>

		<TableHeader>
			<TableRow>
				<TableHead class="w-[52px] text-center"> Produkt </TableHead>

				<TableHead class="w-[200px] text-center"> Eksport z </TableHead>

				<TableHead class="w-[200px] text-center"> Import do </TableHead>

				<TableHead class="text-center"> Cena </TableHead>

				<TableHead class="text-center"> Ilość </TableHead>

				<TableHead class="text-center"> Wartość </TableHead>

				<TableHead class="text-center"> Kontynuować? </TableHead>

				<TableHead class="w-[80px] text-center"> Zapisz </TableHead>

				<TableHead class="w-[50px] text-center"> Usuń </TableHead>
			</TableRow>
		</TableHeader>

		<TableBody class="h-full">
			<TableRow v-for="tradeDeal in tradeDeals" :key="tradeDeal.id" class="h-full cursor-pointer">
				<TableCell class="w-[52px] text-center">
					<ProductTooltip :product="tradeDeal.product" />
				</TableCell>

				<TableCell>
					<ShowEmblemFrame
						v-if="states.some(state => state.id === tradeDeal.importState)"
						:state="states.find(state => state.id === tradeDeal.importState)!"
					/>
				</TableCell>

				<TableCell>
					<ShowEmblemFrame
						v-if="states.some(state => state.id === tradeDeal.exportState)"
						:state="states.find(state => state.id === tradeDeal.exportState)!"
					/>
				</TableCell>

				<TableCell class="text-center text-xl font-bold">
					<NumberField :default-value="tradeDeal.price" :min="0">
						<NumberFieldContent>
							<NumberFieldDecrement />
							<NumberFieldInput />
							<NumberFieldIncrement />
						</NumberFieldContent>
					</NumberField>
				</TableCell>

				<TableCell class="text-center text-xl font-bold">
					<NumberField :default-value="tradeDeal.volume" :min="1">
						<NumberFieldContent>
							<NumberFieldDecrement />
							<NumberFieldInput />
							<NumberFieldIncrement />
						</NumberFieldContent>
					</NumberField>
				</TableCell>

				<TableCell class="text-center text-xl font-bold">
					{{ useFormatNumber(tradeDeal.price * tradeDeal.volume) }}
				</TableCell>

				<TableCell class="w-[25px] text-center">
					<Switch :checked="!tradeDeal.isDiscontinued" />
				</TableCell>

				<TableCell variant="outline" class="w-[80px] text-center">
					<AlertDialog>
						<AlertDialogTrigger as-child>
							<Button> Zapisz </Button>
						</AlertDialogTrigger>

						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle> Czy jesteś pewien? </AlertDialogTitle>

								<AlertDialogDescription>
									Przeanalizuj zmiany, jakie zostaną wprowadzone do tego rekordu w bazie danych:
								</AlertDialogDescription>
							</AlertDialogHeader>

							<AlertDialogFooter>
								<AlertDialogCancel> Cofnij </AlertDialogCancel>

								<AlertDialogAction> Kontynuuj </AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</TableCell>

				<TableCell class="w-[50px] text-center">
					<AlertDialog>
						<AlertDialogTrigger as-child>
							<Button variant="outline" size="icon" class="border-destructive">
								<X class="h-4 w-4 text-destructive" />
							</Button>
						</AlertDialogTrigger>

						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle> Czy jesteś pewien? </AlertDialogTitle>

								<AlertDialogDescription>
									Zastanów się, czy na pewno chcesz usunąć tą umowę handlową? Jeżeli chcesz
									zakończyć umową, to bardziej rekomendowaną opcją jest odznaczenie switcha
									"Kontynuować?". Ponieważ pozwoli to zostawić record w bazie danych, co pozwoli na
									ujęcie tego rekordu na wykresach.
								</AlertDialogDescription>
							</AlertDialogHeader>

							<AlertDialogFooter>
								<AlertDialogCancel> Cofnij </AlertDialogCancel>

								<AlertDialogAction> Kontynuuj </AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</TableCell>
			</TableRow>
		</TableBody>
	</Table>
</template>
