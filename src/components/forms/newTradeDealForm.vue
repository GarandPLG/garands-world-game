<script lang="ts" setup>
import { FormField } from '@/components/ui/form';
import type { StatesResponse, TurnsResponse } from '@/types/pb-types';
import { useForm } from 'vee-validate';

const props = defineProps<{
	turn: TurnsResponse<unknown>;
	states: StatesResponse<unknown, unknown, unknown, unknown, unknown>[];
}>();

const emit = defineEmits<{
	'trade-added': [];
}>();

const pb = usePocketBase();

const {
	handleSubmit,
	values: useFormValues,
	setFieldValue
} = useForm({
	validationSchema: tradeDealFormSchema,
	initialValues: {
		turn: props.turn.id,
		isDiscontinued: false
	}
});

const onSubmit = handleSubmit(async values => {
	const createTradeDeal = await pb
		.collection('trades')
		.create({
			product: values.product,
			turn: values.turn,
			importState: values.importState,
			exportState: values.exportState,
			volume: values.volume,
			price: values.price,
			isDiscontinued: values.isDiscontinued
		})
		.catch((error: unknown) => {
			toast({
				title: `Błąd przy dodawaniu transakcji!`,
				description: error instanceof Error ? `${error.name}: ${error.message}` : 'Nieznany błąd.'
			});
			if (error instanceof Error) throw error;
		});

	if (createTradeDeal) {
		toast({
			title: 'Transakcja została dodana!'
		});

		emit('trade-added');

		openDialog.value = false;
	}
});

function updatePriceAndVolume() {
	const product = useFormValues.product;
	if (product) {
		setFieldValue('volume', 50);
		setFieldValue('price', constProductsData.get(product)?.value ?? 50);
	}
}

const openDialog = ref(false);
</script>

<template>
	<Dialog v-model:open="openDialog">
		<DialogTrigger as-child>
			<Button> Dodaj transakcję </Button>
		</DialogTrigger>

		<DialogContent class="w-[330px]">
			<DialogHeader>
				<DialogTitle>Dodaj nową transakcję</DialogTitle>
			</DialogHeader>
			<form @submit.prevent="onSubmit" class="h-auto space-y-3">
				<FormField v-slot="{ componentField }" name="product">
					<FormItem>
						<FormLabel> Produkt </FormLabel>

						<Select v-bind="componentField" @update:model-value="updatePriceAndVolume()">
							<FormControl>
								<SelectTrigger>
									<SelectValue placeholder="Wybierz produkt" />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								<SelectGroup>
									<SelectItem
										v-for="(value, key) in TradesProductOptions"
										:key="key"
										:value="value"
									>
										<div class="flex items-center gap-2">
											<ProductTooltip :product="value" />

											<p class="text-xl"> {{ constProductsData.get(value)?.translation ?? '' }} </p>
										</div>
									</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>

						<FormDescription> Produkt, który będzie wymieniany. </FormDescription>

						<FormMessage />
					</FormItem>
				</FormField>

				<FormField v-slot="{ componentField }" name="exportState">
					<FormItem>
						<FormLabel> Eksport z </FormLabel>

						<Select v-bind="componentField">
							<FormControl>
								<SelectTrigger>
									<SelectValue placeholder="Wybierz państwo eksportujące" />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								<SelectGroup>
									<SelectItem v-for="(value, key) in states" :key="key" :value="value.id">
										<div class="flex items-center gap-2">
											<span class="mr-2 h-3 w-3">
												<svg width="100%" height="100%" viewBox="0 0 30 30">
													<path
														d="M 15 15 m -14, 0 a 14,14 0 1,1 28,0 a 14,14 0 1,1 -28,0"
														:stroke="value.color"
														:fill="value.color"
														stroke-width="1"
													/>
												</svg>
											</span>

											<h3 class="text-center text-lg font-bold">{{ value.name }}</h3>
										</div>
									</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>

						<FormDescription> Państwo eksportujące w transakcji. </FormDescription>

						<FormMessage />
					</FormItem>
				</FormField>

				<FormField v-slot="{ componentField }" name="importState">
					<FormItem>
						<FormLabel> Import do </FormLabel>

						<Select v-bind="componentField">
							<FormControl>
								<SelectTrigger>
									<SelectValue placeholder="Wybierz państwo importujące" />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								<SelectGroup>
									<SelectItem v-for="(value, key) in states" :key="key" :value="value.id">
										<div class="flex items-center gap-2">
											<span class="mr-2 h-3 w-3">
												<svg width="100%" height="100%" viewBox="0 0 30 30">
													<path
														d="M 15 15 m -14, 0 a 14,14 0 1,1 28,0 a 14,14 0 1,1 -28,0"
														:stroke="value.color"
														:fill="value.color"
														stroke-width="1"
													/>
												</svg>
											</span>
											<h3 class="text-center text-lg font-bold">{{ value.name }}</h3>
										</div>
									</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>

						<FormDescription> Państwo importujące w transakcji. </FormDescription>

						<FormMessage />
					</FormItem>
				</FormField>

				<FormField v-slot="{ componentField }" name="volume" v-if="useFormValues.volume">
					<FormItem>
						<FormLabel> Ilość produktu </FormLabel>

						<NumberField
							:model-value="componentField.modelValue"
							:min="1"
							@update:model-value="
								v => {
									if (v) setFieldValue('volume', v);
									else setFieldValue('volume', 50);
								}
							"
						>
							<NumberFieldContent>
								<NumberFieldDecrement />
								<NumberFieldInput />
								<NumberFieldIncrement />
							</NumberFieldContent>

							<FormDescription> Ilość wymienionego produktu. </FormDescription>

							<FormMessage />
						</NumberField>
					</FormItem>
				</FormField>

				<FormField v-slot="{ componentField }" name="price" v-if="useFormValues.price">
					<FormItem>
						<FormLabel> Cena produktu </FormLabel>

						<NumberField
							:model-value="componentField.modelValue"
							:min="1"
							@update:model-value="
								v => {
									if (v) setFieldValue('price', v);
									else setFieldValue('price', 50);
								}
							"
						>
							<NumberFieldContent>
								<NumberFieldDecrement />
								<NumberFieldInput />
								<NumberFieldIncrement />
							</NumberFieldContent>

							<FormDescription> Cena za sztukę produktu. </FormDescription>

							<FormMessage />
						</NumberField>
					</FormItem>
				</FormField>

				<p
					class="flex justify-center text-center"
					v-if="useFormValues.volume && useFormValues.price"
				>
					Wartość transakcji:
					<span class="ps-1 text-primary">
						{{ useFormatNumber(useFormValues.price * useFormValues.volume) }}
					</span>
				</p>

				<DialogFooter>
					<Button class="w-full" type="submit"> Dodaj transakcję </Button>
				</DialogFooter>
			</form>
		</DialogContent>
	</Dialog>
</template>
