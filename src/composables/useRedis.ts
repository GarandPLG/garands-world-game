export function useRedis() {
	const apiBaseUrl = import.meta.env.PROD
		? 'http://redis-api:5001/api'
		: 'http://localhost:5001/api';
	const loading = ref(false);
	const error = ref<string | null>(null);
	const { toast } = useToast();

	const makeRequest = async (endpoint: string, method: string, body?: Record<string, any>) => {
		loading.value = true;
		error.value = null;

		try {
			const response = await fetch(`${apiBaseUrl}${endpoint}`, {
				method,
				headers: { 'Content-Type': 'application/json' },
				body: body ? JSON.stringify(body) : undefined
			});

			const result = await response.json();
			if (!response.ok) throw new Error(result.error || 'Błąd API');

			return result;
		} catch (err) {
			toast({
				title: 'Błąd w działaniu Redisa!',
				description: err instanceof Error ? `${err.name}: ${err.message}` : 'Nieznany błąd.'
			});

			if (err instanceof Error) error.value = err.message || 'Nieznany błąd';

			return null;
		} finally {
			loading.value = false;
		}
	};

	const get = async (key: string) => {
		return await makeRequest(`/redis?key=${encodeURIComponent(key)}`, 'GET');
	};

	const set = async (key: string, value: any, ttl?: number, type: string = 'string') => {
		return await makeRequest('/redis', 'POST', { key, value, ttl, type });
	};

	const del = async (key: string) => {
		return await makeRequest(`/redis?key=${encodeURIComponent(key)}`, 'DELETE');
	};

	const healthCheck = async () => {
		return await makeRequest('/health', 'GET');
	};

	return {
		loading,
		error,
		get,
		set,
		del,
		healthCheck
	};
}
