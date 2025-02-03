export default function (state: string, turn: number) {
	const { currentUser } = storeToRefs(listenCurrentUserStore());

	const user = currentUser.value?.id ? `${currentUser.value.id}` : null;

	const isUserNotAdmin = !['moderator', 'admin'].includes(currentUser.value?.role);

	const redisKeyPrefix = `${state}-${turn + 1}-${isUserNotAdmin ? user : 'Administration'}`;

	return { redisKeyPrefix, user, isUserNotAdmin };
}
