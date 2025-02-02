export default function useFormatNumber(num: number | Date) {
	return num.toLocaleString('en-US');
}
