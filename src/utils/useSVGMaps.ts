import { ELEMENT_NODE, parse, render, walk } from '@michaelhthomas/fluxhtml';

async function extractSVG(node: any, type: keyof typeof svgMaps) {
	const fullName: string =
		type === 'burg'
			? node.children[0].children[0]?.value
			: node.children[0].children[0].children[0]?.value;
	const svg = await render(type === 'burg' ? node.children[1] : node.children[0].children[1]);
	if (fullName) svgMaps[type].set(fullName, svg);
}

async function readFileAsync(file: File) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result);
		reader.onerror = () => reject(reader.error);
		reader.readAsText(file);
	});
}

const svgMaps = {
	state: new Map<string, string>(),
	province: new Map<string, string>(),
	burg: new Map<string, string>()
};

export async function useSVGMaps(emblemsHTMLFile: File): Promise<typeof svgMaps> {
	svgMaps.state.clear();
	svgMaps.province.clear();
	svgMaps.burg.clear();

	let startTime = new Date().getTime();

	try {
		const fileContent = await readFileAsync(emblemsHTMLFile);
		const ast = parse(fileContent as string);

		await walk(ast, async node => {
			if (node.type === ELEMENT_NODE && node.name === 'figure' && node.attributes.id) {
				const id = node.attributes.id;
				if (id.includes('state')) await extractSVG(node, 'state');
				else if (id.includes('province')) await extractSVG(node, 'province');
				else if (id.includes('burg')) await extractSVG(node, 'burg');
			}
		});
	} catch (error) {
		toast({
			title: 'Błąd parsowaniu pliku HTML Emblemów!',
			description: error instanceof Error ? `${error.name}: ${error.message}` : 'Nieznany błąd.'
		});
		if (error instanceof Error) throw error;
	}

	let endTime = new Date().getTime();

	toast({
		title: 'Emblemy zostały przepracowane',
		description: `Przepracowano ${svgMaps.burg.size + svgMaps.province.size + svgMaps.state.size} emblemów w czasie: ${((endTime - startTime) / 1000).toFixed(3)} s`
	});

	return svgMaps;
}
