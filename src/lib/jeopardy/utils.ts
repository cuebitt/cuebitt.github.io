import { nanoid } from 'nanoid';

interface BoardColItem {
	id: string;
	prompt: string;
	response: string;
	isDailyDouble: boolean;
}

export function serializeBoard(categories: string[], items: BoardColItem[][]) {
	const categoriesCombined = categories.map((category, i) => ({
		name: category.trim(),
		items: items[i].map((item: BoardColItem) => ({
			prompt: item.prompt.startsWith('dd!') ? item.prompt.slice(3) : item.prompt,
			response: item.response,
			isDailyDouble: item.isDailyDouble
		}))
	}));

	const board = {
		categories: categoriesCombined,
		values: [100, 200, 300, 400, 500]
	};

	return JSON.stringify(board, null, 2);
}

export function deserializeBoard(json: string) {
	const board = JSON.parse(json);
	const categories = board.categories.map(
		(category: { name: string; items: BoardColItem[] }) => category.name
	);
	const boardItems = board.categories.map((category: { name: string; items: BoardColItem[] }) =>
		category.items.map((item: BoardColItem) => ({
			id: nanoid(),
			prompt: item.isDailyDouble ? `dd!${item.prompt}` : item.prompt,
			response: item.response,
			isDailyDouble: item.isDailyDouble
		}))
	);

	return [categories, boardItems];
}
