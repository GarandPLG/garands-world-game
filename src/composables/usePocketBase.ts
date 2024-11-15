import type { TypedPocketBase } from '@/types/pb-types';
import PocketBase from 'pocketbase';

// TODO: dodać sprawdzenie, czy jest zdokeryzowany, jeżeli tak to zmienić url na '/'
export default function usePocketBase(): TypedPocketBase {
	return new PocketBase('/pb').autoCancellation(false) as TypedPocketBase;
}
