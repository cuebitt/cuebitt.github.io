<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea/';
	import { nanoid } from 'nanoid';
	import { dragHandleZone, dragHandle } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import { GripVertical } from 'lucide-svelte';
	import type { DndEvent } from 'svelte-dnd-action';
	import { clsx } from 'clsx';

	interface BoardColItem {
		id: string;
		prompt: string;
		response: string;
		isDailyDouble: boolean;
	}

	export let showResponses: boolean = false;
	export let categoryTitle: string = '';
	export let items: BoardColItem[] = [];
	// if there are less than 5 items, add empty items
	$: _items =
		items.length < 5
			? [
					...items,
					...Array.from({ length: 5 - items.length }, () => ({
						id: nanoid(),
						prompt: '',
						response: '',
						isDailyDouble: false
					}))
				]
			: items;

	function handleSort(e: CustomEvent<DndEvent<BoardColItem>>) {
		_items = e.detail.items;
	}

	function updateItems(e: CustomEvent<DndEvent<BoardColItem>>) {
		handleSort(e);
		items = _items;
	}

	function onTextareaChange(e: Event) {
		const target = e.target as HTMLTextAreaElement;
		if (!target || !target.dataset.idx) return;

		const idx = parseInt(target.dataset.idx, 10);
		updateItem(idx, target.value);
	}

	function updateItem(index: number, value: string) {
		const itemCopy = _items[index];
		itemCopy.isDailyDouble = value.startsWith('dd!');
		if (showResponses) {
			itemCopy.response = value;
		} else {
			itemCopy.prompt = value;
		}

		_items = _items.with(index, itemCopy);

		items = _items;
	}

	// disallow dragging to another dndzone
	const dragZoneId = nanoid();
</script>

<div>
	<Input bind:value={categoryTitle} />
	<div
		use:dragHandleZone={{ items: _items, flipDurationMs: 300, type: dragZoneId }}
		on:consider={handleSort}
		on:finalize={updateItems}
		class="mt-2 flex flex-col gap-2"
	>
		{#each _items as item, i (item.id)}
			<div animate:flip={{ duration: 300 }} class="h-24">
				<div class="relative h-full transition-transform hover:scale-110">
					<Textarea
						value={showResponses ? item.response : item.prompt}
						data-idx={i}
						on:change={onTextareaChange}
						class={clsx('peer h-full', {
							'bg-slate-200 dark:bg-slate-900': item.isDailyDouble
						})}
					/>

					<span class="absolute right-1 top-2 opacity-50 peer-focus:invisible">
						<div use:dragHandle>
							<GripVertical />
						</div>
					</span>
				</div>
			</div>
		{/each}
	</div>
</div>
