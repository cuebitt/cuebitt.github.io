import { create } from "zustand";

interface JeopardyState {
	categories: string[];
	setCategory: (index: number, value: string) => void;

	questionCols: QuestionCol[];
	setQuestion: (row: number, col: number, value: QuestionWithAnswer) => void;

	selected: { row: number; col: number };
	setSelected: (row: number, col: number) => void;

	showQuestion: boolean;
	setShowQuestion: (value: boolean) => void;
}

interface QuestionWithAnswer {
	question: string;
	answer: string;
	isDailyDouble: boolean;
}

interface QuestionCol {
	questions: QuestionWithAnswer[];
	value: number;
}

const defaultQuestionRow = (): QuestionCol => {
	return {
		questions: Array.from({ length: 5 }, () => ({
			question: "",
			answer: "",
			isDailyDouble: false,
		})),
		value: 0,
	};
};

export const useJeopardyStore = create<JeopardyState>((set) => ({
	categories: Array(6).fill(""),
	setCategory: (index: number, value: string) =>
		set((state) => ({
			categories: state.categories.map((val, idx) =>
				idx === index ? value : val,
			),
		})),

	questionCols: Array.from({ length: 6 }, () => defaultQuestionRow()),
	setQuestion: (row: number, col: number, value: QuestionWithAnswer) =>
		set((state) => ({
			questionCols: state.questionCols.map((questionCol, idx) =>
				idx === col
					? {
							...questionCol,
							questions: questionCol.questions.map((question, idx) =>
								idx === row ? value : question,
							),
						}
					: questionCol,
			),
		})),

	selected: { row: 0, col: 0 },
	setSelected: (row: number, col: number) => set({ selected: { row, col } }),

	showQuestion: false,
	setShowQuestion: (value: boolean) => set({ showQuestion: value }),
}));
