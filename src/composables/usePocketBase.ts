import type { TypedPocketBase } from '@/types/pb-types';
import PocketBase from 'pocketbase';

export default function usePocketBase(): TypedPocketBase {
	const pb = new PocketBase('/pb').autoCancellation(false) as TypedPocketBase;

	return pb;
}
