import type { TypedPocketBase } from '@/types/pb-types';
import PocketBase from 'pocketbase';

export default function usePocketBase(): TypedPocketBase {
	return new PocketBase(import.meta.env.PROD ? '/' : '/pb').autoCancellation(
		false
	) as TypedPocketBase;
}
