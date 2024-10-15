import PocketBase from 'pocketbase';
import type { TypedPocketBase } from '@/types/pb-types';

export default function usePocketBase() {
	const pb = new PocketBase('/pb').autoCancellation(false) as TypedPocketBase;
	return pb;
}
