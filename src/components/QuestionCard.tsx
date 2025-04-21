type Props = {
    question: string;
    options: string[];
    correctAnswer: string;
    selected: string | null;
    showCorrect: boolean;
    onSelect: (option: string) => void;
}

export default function QuestionCard({
                          question,
                          options,
                          correctAnswer,
                          selected,
                          showCorrect,
                          onSelect,
                      }: Props) {
    const getButtonClass = (option: string) =>
        !showCorrect ? 'bg-gray-700 hover:bg-gray-600' :
            option === correctAnswer ? 'bg-green-600' :
                option === selected && option !== correctAnswer ? 'bg-red-600' :
                    'bg-gray-700';

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-white">
            <h1 className="text-2xl font-bold mb-4">{question}</h1>
            <div className="grid grid-cols-2 gap-2">
                {options.map((option) => (
                    <button
                        key={option}
                        className={`p-2 rounded text-sm border ${getButtonClass(option)}`}
                        onClick={() => onSelect(option)}
                        disabled={!!selected}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}