import { QuestionColumn } from "./_components/QuestionColumn";
import { nanoid } from "nanoid";
import { useJeopardyStore } from "./store";
import { Settings } from "./_components/Settings";
import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@/components/Link";
import { CircleHelp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GameJson {
	categories: {
		[key: string]: {
			answer: string;
			question: string;
			isDailyDouble: boolean;
		}[];
	};
	values: number[];
}

export default function Page() {
	const showQuestion = useJeopardyStore((state) => state.showQuestion);
	const questionCols = useJeopardyStore((state) => state.questionCols);
	const categories = useJeopardyStore((state) => state.categories);
	const values = useJeopardyStore((state) => state.values);

	const setCategory = useJeopardyStore((state) => state.setCategory);

	const [exported, setExported] = useState("");
	const [dialogOpen, setDialogOpen] = useState(false);

	const exportGame = () => {
		const data = new Map();

		categories.forEach((category, idx) => {
			data.set(category, questionCols[idx].questions);
		});

		setExported(
			JSON.stringify(
				{
					categories: Object.fromEntries(data),
					values: values,
				},
				null,
				2,
			),
		);

		setDialogOpen(true);
	};

	const importGame = (json: GameJson) => {
		Object.keys(json.categories).forEach((category, idx) => {
			setCategory(idx, category);
			json.categories[category].forEach((question, idx2) => {
				questionCols[idx].questions[idx2] = question;
			});
		});
	};

	return (
		<>
			<header className="mb-5">
				<div className="flex flex-row justify-between">
					<hgroup>
						<h1 className="text-4xl font-extrabold">
							Jeopardy Game JSON Maker
						</h1>
						<h2 className="text-xl font-semibold">
							for Cuebitt's Jeopardy VRChat World!
						</h2>
					</hgroup>

					<Dialog>
						<DialogTrigger asChild>
							<Button className="flex flex-row gap-2">
								<CircleHelp /> What's this?
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle className="text-3xl mb-5">About</DialogTitle>
								<DialogDescription>
									<p className="text-lg">
										This is a tool to generate a JSON file for use in a Jeopardy
										game world in VRChat that I'm making.
										<br />
										<br />
										You can write all your own questions and load it in game to
										play a real game of Jeopardy in front of a live audience!
									</p>
								</DialogDescription>
							</DialogHeader>
						</DialogContent>
					</Dialog>
				</div>
			</header>
			<main className="mb-10">
				<div className="container mx-auto">
					<div className="flex flex-row gap-2 justify-center mb-10">
						{Array.from({ length: 6 }).map((_, idx) => {
							return (
								<QuestionColumn
									index={idx}
									key={nanoid()}
									showQuestion={showQuestion}
								/>
							);
						})}
					</div>
					<hr className="mb-5" />
					<div className="flex flex-row justify-center my-4">
						<Settings
							onExport={exportGame}
							onImportSample={() => {
								fetch("/sample.json")
									.then((res) => res.json())
									.then((data) => {
										importGame(data);
									});
							}}
						></Settings>
					</div>

					<Dialog
						open={dialogOpen}
						onOpenChange={(open) => setDialogOpen(open)}
					>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Exported JSON</DialogTitle>
								<DialogDescription>
									Upload this JSON document to{" "}
									<a
										href="https://pastebin.com"
										target="_blank"
										rel="noopener noreferrer"
									>
										Pastebin
									</a>{" "}
									or{" "}
									<a
										href="https://gist.github.com"
										target="_blank"
										rel="noopener noreferrer"
									>
										GitHub Gist
									</a>{" "}
									to use it in game!
								</DialogDescription>
							</DialogHeader>

							<Textarea value={exported} readOnly rows={20}></Textarea>
						</DialogContent>
					</Dialog>
				</div>
			</main>

			<footer>
				<nav>
					<ul className="flex flex-row gap-10 justify-center">
						<li>
							<Link href="/">Home</Link>
						</li>
						<li>
							<a
								href="https://github.com/cuebitt/cuebitt.github.io"
								target="_blank"
								rel="noopener noreferrer"
							>
								Source Code
							</a>
						</li>
					</ul>
				</nav>
			</footer>
		</>
	);
}
