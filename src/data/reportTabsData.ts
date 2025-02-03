import AdministrationReport from '@/components/report/administrationReport.vue';
import BuildingsReport from '@/components/report/buildingsReport.vue';
import DiplomacyReport from '@/components/report/diplomacyReport.vue';
import FinanceReport from '@/components/report/financeReport.vue';
import MilitaryReport from '@/components/report/militaryReport.vue';
import PopulationReport from '@/components/report/populationReport.vue';
import SummaryReport from '@/components/report/summaryReport.vue';
import TradeReport from '@/components/report/tradeReport.vue';
import type { Component } from 'vue';

interface ReportTabs {
	value: string;
	name: string;
	component: Component;
}

export const reportTabsData: ReportTabs[] = [
	{
		value: 'buildings',
		name: 'Budynki',
		component: BuildingsReport
	},
	{
		value: 'trade',
		name: 'Handel',
		component: TradeReport
	},
	{
		value: 'military',
		name: 'Wojsko',
		component: MilitaryReport
	},
	{
		value: 'administration',
		name: 'Administracja',
		component: AdministrationReport
	},
	{
		value: 'diplomacy',
		name: 'Dyplomacja',
		component: DiplomacyReport
	},
	{
		value: 'population',
		name: 'Populacja',
		component: PopulationReport
	},
	{
		value: 'finance',
		name: 'Finanse',
		component: FinanceReport
	},
	{
		value: 'summary',
		name: 'Podsumowanie',
		component: SummaryReport
	}
];
