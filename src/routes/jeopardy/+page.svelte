<script lang="ts">
	import BoardCol from '$lib/jeopardy/BoardCol.svelte';
	import { nanoid } from 'nanoid';
	import { Separator } from '$lib/components/ui/separator';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';

	import sample from '$lib/jeopardy/sample.json';

	interface BoardColItem {
		id: string;
		prompt: string;
		response: string;
		isDailyDouble: boolean;
	}

	let categories = Array(6).fill('');
	let boardItems: BoardColItem[][] = Array.from({ length: 6 }, () =>
		Array.from({ length: 5 }, () => ({
			id: nanoid(),
			prompt: '',
			response: '',
			isDailyDouble: false
		}))
	);

	// load a sample board json
	const loadSample = () => {
		categories = Object.keys(sample.categories);
		boardItems = Object.values(sample.categories).map((items) =>
			items.map((item) => ({
				...item,
				id: nanoid(),
				prompt: item.isDailyDouble ? `!dd${item.prompt}` : item.prompt
			}))
		);
	};
</script>

<header class="m-4 mb-8">
	<hgroup>
		<h1 class="text-4xl font-extrabold">Jeopardy Game JSON Maker</h1>
		<h2 class="text-xl font-semibold">for Cuebitt's <em>JeoparDIY VR</em> game world in VRChat!</h2>
	</hgroup>
</header>

<main class="mx-4 my-8">
	<div class="flex flex-row items-center justify-center gap-4">
		<BoardCol bind:categoryTitle={categories[0]} bind:items={boardItems[0]} />
		<BoardCol bind:categoryTitle={categories[1]} bind:items={boardItems[1]} />
		<BoardCol bind:categoryTitle={categories[2]} bind:items={boardItems[2]} />
		<BoardCol bind:categoryTitle={categories[3]} bind:items={boardItems[3]} />
		<BoardCol bind:categoryTitle={categories[4]} bind:items={boardItems[4]} />
		<BoardCol bind:categoryTitle={categories[5]} bind:items={boardItems[5]} />
	</div>

	<Separator class="my-8 w-full" />

	<div class="flex flex-row items-stretch justify-center gap-4">
		<Card.Root>
			<Card.Header class="text-2xl font-semibold leading-none tracking-tight"
				>Instructions</Card.Header
			>
			<Card.Content>
				<ul>
					<li>Click on a text box to fill in a prompt (what the players will be shown).</li>
					<li>Activate "Show Responses" to fill in the responses the players will try to guess.</li>
					<li>Add !dd to the beginning of a prompt to mark the item as the Daily Double.</li>
					<li>
						Click and drag the handles at the top right of each item to reorder the questions.
					</li>
					<li>Fill in the category names at the top of each column.</li>
					<li>Click "Export JSON" to convert the board to a text file.</li>
				</ul>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header class="text-2xl font-semibold leading-none tracking-tight">Options</Card.Header>
			<Card.Content class="flex flex-col gap-2">
				<Button on:click={loadSample}>Import Sample Board</Button>
				<Button on:click={() => alert('todo')}>Export JSON</Button>
			</Card.Content>
		</Card.Root>
	</div>
</main>

<footer></footer>
