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
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export default function Page() {
	const showQuestion = useJeopardyStore((state) => state.showQuestion);
	const questionCols = useJeopardyStore((state) => state.questionCols);
	const categories = useJeopardyStore((state) => state.categories);
	const values = useJeopardyStore((state) => state.values);

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

	return (
		<div className="container mx-auto">
			<div className="flex flex-row gap-2 justify-center">
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

			<div className="flex flex-row justify-center my-4">
				<Settings onExport={exportGame}></Settings>
			</div>

			<Dialog open={dialogOpen} onOpenChange={(open) => setDialogOpen(open)}>
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
	);
}
