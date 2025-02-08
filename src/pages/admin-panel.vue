<script lang="ts" setup>
import manageTradeDeals from '@/components/admin-panel/manageTradeDeals.vue';
import PreviewReportTab from '@/components/admin-panel/previewReportTab.vue';
import TurnEndTab from '@/components/admin-panel/turnEndTab.vue';
import type { Component } from 'vue';

useHead({
	title: "Garand's WG | Panel Administratora"
});

const sidebarNavItems: {
	content: Component;
	props: {
		title: string;
		description: string;
	};
}[] = [
	{
		content: TurnEndTab,
		props: {
			title: 'Koniec Tury',
			description: 'Zarządzanie końcem tury'
		}
	},
	{
		content: PreviewReportTab,
		props: {
			title: 'Przeglądanie Raportów',
			description: 'Możliwość obejrzenia raportów danego kraju'
		}
	},
	{
		content: manageTradeDeals,
		props: {
			title: 'Zarządzanie umowami handlowymi',
			description: 'Dodawanie/Edytowanie/Usuwanie umów handlowych'
		}
	}
];
</script>

<template>
	<div class="hidden space-y-6 p-2 md:block">
		<div class="space-y-0.5">
			<h2 class="text-2xl font-bold tracking-tight"> Panel Administratora </h2>
			<p class="text-muted-foreground"> Panel dla moderatorów i adminów do zarządzania WG. </p>
		</div>

		<Separator class="my-6" />

		<Tabs
			:default-value="sidebarNavItems[0].props.title"
			class="flex w-full gap-4"
			orientation="vertical"
		>
			<TabsList class="grid h-1/2 w-1/6 grid-cols-1">
				<TabsTrigger
					:value="item.props.title"
					v-for="(item, index) in sidebarNavItems"
					:key="index"
				>
					{{ item.props.title }}
				</TabsTrigger>
			</TabsList>

			<TabsContent
				:value="item.props.title"
				class="w-5/6"
				v-for="(item, index) in sidebarNavItems"
				:key="index"
			>
				<component :is="item.content" v-bind="item.props"></component>
			</TabsContent>
		</Tabs>
	</div>
</template>
