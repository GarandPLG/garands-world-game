<script lang="ts" setup>
import { Icon } from '@iconify/vue';
defineProps<{ product: TradesProductOptions; size?: string }>();
</script>

<template>
	<TooltipProvider>
		<Tooltip>
			<TooltipTrigger as-child>
				<Icon
					:icon="constProductsData.get(product)?.icon ?? ''"
					:width="size ? size : '52'"
					:height="size ? size : '52'"
					class="text-primary"
				/>
			</TooltipTrigger>

			<TooltipContent>
				<p class="text-center">
					{{ constProductsData.get(product)?.translation ?? '' }}
				</p>
			</TooltipContent>
		</Tooltip>
	</TooltipProvider>
</template>
