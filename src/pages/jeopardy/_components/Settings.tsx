import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { useJeopardyStore } from "../store";

export const Settings = () => {
	const selected = useJeopardyStore((state) => state.selected);
	const setQuestion = useJeopardyStore((state) => state.setQuestion);
	const questionCols = useJeopardyStore((state) => state.questionCols);
	const showQuestion = useJeopardyStore((state) => state.showQuestion);
	const setShowQuestion = useJeopardyStore((state) => state.setShowQuestion);

	const [currQuestion, setCurrQuestion] = useState("");
	const [currAnswer, setCurrAnswer] = useState("");
	const [isDailyDouble, setIsDailyDouble] = useState(false);

	useEffect(() => {
		setCurrQuestion(
			questionCols[selected.col].questions[selected.row].question,
		);
		setCurrAnswer(questionCols[selected.col].questions[selected.row].answer);
		setIsDailyDouble(
			questionCols[selected.col].questions[selected.row].isDailyDouble,
		);
	}, [questionCols, selected]);

	return (
		<>
			<div className="flex flex-row space-x-2">
				<Card>
					<CardHeader>
						<CardTitle>Answer</CardTitle>
						<CardDescription>
							This will be displayed on the board
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Textarea
							value={currAnswer}
							onChange={(e) => setCurrAnswer(e.target.value)}
						></Textarea>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Question</CardTitle>
						<CardDescription>
							The players will try to guess this
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Textarea
							value={currQuestion}
							onChange={(e) => setCurrQuestion(e.target.value)}
						></Textarea>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Options</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex flex-col justify-center gap-4">
							<div className="flex items-center space-x-2">
								<Switch
									id="daily-double"
									checked={isDailyDouble}
									onCheckedChange={(checked) => setIsDailyDouble(checked)}
								/>
								<Label htmlFor="daily-double">Daily Double</Label>
							</div>
							<Button
								onClick={() =>
									setQuestion(selected.row, selected.col, {
										question: currQuestion,
										answer: currAnswer,
										isDailyDouble: isDailyDouble,
									})
								}
							>
								Update Question
							</Button>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Other</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex flex-col justify-center gap-4">
							<div className="flex items-center space-x-2">
								<Switch
									id="show-question"
									checked={showQuestion}
									onCheckedChange={(checked) => setShowQuestion(checked)}
								/>
								<Label htmlFor="show-question">Show Questions</Label>
							</div>
							<Button>Export</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</>
	);
};
