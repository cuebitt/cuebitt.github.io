<script lang="ts">
	export let count: number = 0;
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ count: { newCount: number } }>();

	function incrementCount() {
		dispatch('count', {
			newCount: count + 1
		});
	}
</script>

<button on:click={incrementCount}>Count: {count}</button>
