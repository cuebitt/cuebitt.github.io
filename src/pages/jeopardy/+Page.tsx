import { QuestionColumn } from "./_components/QuestionColumn";
import { nanoid } from "nanoid";
import { useJeopardyStore } from "./store";
import { Settings } from "./_components/Settings";

export default function Page() {
	const showQuestion = useJeopardyStore((state) => state.showQuestion);

	return (
		<div className="container mx-auto">
			<div className="flex flex-row gap-2">
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
				<Settings></Settings>
			</div>
		</div>
	);
}
