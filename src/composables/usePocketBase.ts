import type { TypedPocketBase } from '@/types/pb-types';
import PocketBase from 'pocketbase';

export default function usePocketBase(): TypedPocketBase {
	return new PocketBase('/pb').autoCancellation(false) as TypedPocketBase;
}
