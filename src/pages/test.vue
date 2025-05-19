<script lang="ts" setup>
import type { AzgaarJSONFull } from '@/types/azgaarJSONFull';

const fileData = ref<AzgaarJSONFull | null>(null);
const fileError = ref<string | null>(null);

const handleFileUpload = (event: Event) => {
	const input = event.target as HTMLInputElement;
	fileError.value = null;

	if (!input.files || input.files.length === 0) {
		fileError.value = 'Wybierz plik';
		return;
	}

	const file = input.files[0];
	if (file.type !== 'application/json') {
		fileError.value = 'Plik musi być typu JSON';
		return;
	}

	const reader = new FileReader();
	reader.onload = e => {
		try {
			const content = e.target?.result as string;
			fileData.value = JSON.parse(content) as AzgaarJSONFull;
		} catch (error) {
			fileError.value = 'Nieprawidłowy format JSON';
			console.error(error);
		}
	};
	reader.readAsText(file);
};

const submitForm = () => {
	if (!fileData.value) {
		fileError.value = 'Najpierw wczytaj plik JSON';
		return;
	}

	try {
		const result = useExtractMapData(fileData.value);
		console.log(result);
	} catch (error) {
		console.error('Błąd podczas przetwarzania danych:', error);
	}
};
</script>

<template>
	<div class="container">
		<h1>Test</h1>

		<form @submit.prevent="submitForm" class="form">
			<div class="form-group">
				<label for="jsonFile">Wybierz plik JSON (typ: AzgaarJSONFull):</label>
				<input
					type="file"
					id="jsonFile"
					accept=".json"
					@change="handleFileUpload"
					class="file-input"
				/>
				<p v-if="fileError" class="error-message">{{ fileError }}</p>
				<p v-if="fileData" class="success-message">Plik załadowany poprawnie</p>
			</div>

			<button type="submit" class="submit-button" :disabled="!fileData"> Przetwórz dane </button>
		</form>
	</div>
</template>

<style lang="postcss" scoped>
.container {
	max-width: 600px;
	margin: 0 auto;
	padding: 20px;
}

.form {
	margin-top: 20px;
	border: 1px solid #ddd;
	padding: 20px;
	border-radius: 8px;
}

.form-group {
	margin-bottom: 15px;
}

label {
	display: block;
	margin-bottom: 8px;
	font-weight: bold;
}

.file-input {
	width: 100%;
	padding: 10px 0;
}

.error-message {
	color: red;
	font-size: 14px;
	margin-top: 5px;
}

.success-message {
	color: green;
	font-size: 14px;
	margin-top: 5px;
}

.submit-button {
	background-color: #4caf50;
	color: white;
	padding: 10px 15px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-size: 16px;
}

.submit-button:disabled {
	background-color: #cccccc;
	cursor: not-allowed;
}

.submit-button:hover:not(:disabled) {
	background-color: #45a049;
}
</style>
