<script lang="ts" setup>
// TODO: Budynki
import type { StatesResponse, TurnsResponse } from '@/types/pb-types';

const props = defineProps<{
	turn: TurnsResponse<unknown>;
	state: StatesResponse<unknown, unknown, unknown, unknown, unknown>;
}>();
</script>

<template>
	<div> </div>
</template>
