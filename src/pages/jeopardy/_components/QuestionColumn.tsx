import { useJeopardyStore } from "../store";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { nanoid } from "nanoid";
import { useState } from "react";

export const QuestionColumn = ({ index = 0, showQuestion = false }) => {
	const categories = useJeopardyStore((state) => state.categories);
	const setCategory = useJeopardyStore((state) => state.setCategory);

	const questionCol = useJeopardyStore((state) => state.questionCols[index]);

	const setSelected = useJeopardyStore((state) => state.setSelected);
	const selected = useJeopardyStore((state) => state.selected);

	const [currCategory, setCurrCategory] = useState(categories[index]);

	return (
		<>
			<div className="flex flex-col gap-2">
				<Input
					type="text"
					value={currCategory}
					onChange={(e) => setCurrCategory(e.target.value)}
					onBlur={() => setCategory(index, currCategory)}
					key="category-input"
					className="w-48"
				></Input>

				{Array.from({ length: 5 }).map((_, idx) => (
					<div
						className={clsx({
							"border-4": selected.col == index && selected.row == idx,
							border: selected.col != index || selected.row != idx,
							"border-sky-500": questionCol.questions[idx].isDailyDouble,
							"h-28": true,
							"w-48": true,
							"rounded-lg": true,
							"transition-transform": true,
							"duration-300": true,
							"hover:scale-105": true,
							"overflow-hidden": true,
							"p-1": true,
							"text-md": true,
						})}
						key={nanoid()}
						onClick={() => setSelected(idx, index)}
					>
						{showQuestion
							? questionCol.questions[idx].question || ""
							: questionCol.questions[idx].answer || ""}
					</div>
				))}
			</div>
		</>
	);
};
