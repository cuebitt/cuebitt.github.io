import { useJeopardyStore } from "../store";
import { Input } from "@/components/ui/input";
import { nanoid } from "nanoid";

export const QuestionColumn = ({ index = 0, showQuestion = false }) => {
	const categories = useJeopardyStore((state) => state.categories);
	const setCategory = useJeopardyStore((state) => state.setCategory);

	const questionCol = useJeopardyStore((state) => state.questionCols[index]);

	const setSelected = useJeopardyStore((state) => state.setSelected);
	const selected = useJeopardyStore((state) => state.selected);

	return (
		<>
			<div className="flex flex-col gap-2">
				<Input
					type="text"
					value={categories[index]}
					onChange={(e) => setCategory(index, e.target.value || "")}
				></Input>

				{Array.from({ length: 5 }).map((_, idx) => (
					<div
						className={`${selected.col == index && selected.row == idx ? "border-4" : "border"} h-24 rounded-lg transition-transform duration-300 hover:scale-105`}
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
