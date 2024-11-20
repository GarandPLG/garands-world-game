import type { AuthModel } from 'pocketbase';

const pb = usePocketBase();

export const listenCurrentUserStore = defineStore('listenCurrentUserStore', () => {
	const currentUser = ref<AuthModel | null>(null);

	function setCurrentUser(user: AuthModel | null): void {
		currentUser.value = user;
	}

	function initCurrentUser(): void {
		setCurrentUser(pb.authStore.model);
	}

	function listenCurrentUserChange(): void {
		pb.authStore.onChange(() => {
			setCurrentUser(pb.authStore.model);
		});
	}

	return { currentUser, initCurrentUser, setCurrentUser, listenCurrentUserChange };
});
