// components/QuestionCard.tsx
type Props = {
    question: string
    options: string[]
    correctAnswer: string
    selected: string | null
    showCorrect: boolean
    onSelect: (option: string) => void
}

const QuestionCard = ({ question, options, correctAnswer, selected, showCorrect, onSelect }: Props) => {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">{question}</h1>
            <div className="grid grid-cols-2 gap-2">
                {options.map(option => {
                    const isCorrect = option === correctAnswer
                    const isSelected = selected === option
                    const show = showCorrect && (isSelected || isCorrect)

                    return (
                        <button
                            key={option}
                            className={`p-2 rounded text-sm border 
              ${show && isCorrect ? 'bg-green-600' : ''}
              ${show && isSelected && !isCorrect ? 'bg-red-600' : ''}
              ${!show ? 'bg-gray-700 hover:bg-gray-600' : ''}`}
                            onClick={() => onSelect(option)}
                            disabled={!!selected}
                        >
                            {option}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default QuestionCard
