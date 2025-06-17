<script lang="ts">
	import MarkdownIt from 'markdown-it';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';

	const md = new MarkdownIt({
		breaks: true,
		html: false
	});

	// Custom inline formatting
	md.renderer.rules.strong_open = () => '<b>';
	md.renderer.rules.strong_close = () => '</b>';

	md.renderer.rules.em_open = () => '<i>';
	md.renderer.rules.em_close = () => '</i>';

	md.renderer.rules.del_open = () => '<s>';
	md.renderer.rules.del_close = () => '</s>';

	md.renderer.rules.code_inline = (tokens, idx) => {
		const content = tokens[idx].content;
		return `<mark>${escapeHTML(content)}</mark>`;
	};

	md.renderer.rules.link_open = () => '<u>';
	md.renderer.rules.link_close = () => '</u>';

	// Headings
	md.renderer.rules.heading_open = (tokens, idx) => {
		const level = parseInt(tokens[idx].tag.slice(1));
		const sizeArr = ['', '150%', '125%', '110%'];

		const size = sizeArr[level] || '100%';
		return `\n<size=${size}><b>`;
	};
	md.renderer.rules.heading_close = () => '</b></size>\n\n';

	// List items
	md.renderer.rules.bullet_list_open = () => '';
	md.renderer.rules.bullet_list_close = () => '';
	md.renderer.rules.list_item_open = () => '• ';
	md.renderer.rules.list_item_close = () => '';

	// Paragraphs
	md.renderer.rules.paragraph_open = () => '';
	md.renderer.rules.paragraph_close = () => '\n';

	// Utility: escape TMP-unsafe characters
	function escapeHTML(str: string) {
		return str.replace(/[<>&"]/g, (ch) => {
			return (
				{
					'<': '&lt;',
					'>': '&gt;',
					'&': '&amp;',
					'"': '&quot;'
				}[ch] || ch
			);
		});
	}

	export function markdownToTMP(input: string) {
		return md.render(input).trim();
	}

	function bytesToBase64(bytes: Uint8Array<ArrayBufferLike>) {
		const binString = String.fromCharCode(...bytes);
		return btoa(binString);
	}

	let inputMarkdown = $state('');
	let outputTMP = $state('');

	const convertMdToTMP = (inputMd: string) => {
		const converted = markdownToTMP(inputMd.trim());

		const utf8Encoder = new TextEncoder();
		return bytesToBase64(utf8Encoder.encode(converted));
	};

	const submitHandler = () => {
		const changelog = {
			updated: Date.now(),
			changelog: convertMdToTMP(inputMarkdown)
		};

		outputTMP = JSON.stringify(changelog, null, 4);
	};
</script>

<div class="grid h-full grid-cols-2 gap-2">
	<div class="flex h-full flex-col gap-0.5">
		<h2 class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
			Input
		</h2>
		<Textarea class="h-full" id="md-input" bind:value={inputMarkdown}></Textarea>
		<Button class="border" id="submit-md" onclick={() => submitHandler()}>Submit</Button>
	</div>
	<div class="flex h-full flex-col">
		<h2 class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
			Output
		</h2>
		<Textarea class="size-full" id="md-output" readonly bind:value={outputTMP}></Textarea>
	</div>
</div>
