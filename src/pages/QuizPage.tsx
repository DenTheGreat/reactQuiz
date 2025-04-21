import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import QuestionCard from '../components/QuestionCard';
import { Question } from "../types";

export default function QuizPage() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const [showCorrect, setShowCorrect] = useState(false);
    const navigate = useNavigate();

    const { name: userName, score, setScore } = useQuiz();

    useEffect(() => {
        fetch('/data/questions.json')
            .then((res) => res.json())
            .then((data) => setQuestions(data))
            .catch((err) => console.error('Failed to load questions', err));
    }, []);

    const currentQuestion = questions[currentIndex];

    const handleAnswer = (option: string) => {
        if (selected) return;

        const isCorrect = option === currentQuestion.answer;
        const newScore = isCorrect ? score + 1 : score;

        setSelected(option);
        setShowCorrect(true);

        if (isCorrect) setScore(newScore);

        setTimeout(() => {
            const isLastQuestion = currentIndex + 1 >= questions.length;

            if (isLastQuestion) {
                navigate('/score', { state: { name: userName, score: newScore } });
            } else {
                setCurrentIndex((prev) => prev + 1);
                setSelected(null);
                setShowCorrect(false);
            }
        }, 1500);
    };

    if (questions.length === 0) {
        return <div className="text-white p-4">Loading questions...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-white">
            <QuestionCard
                question={currentQuestion.question}
                options={currentQuestion.options}
                correctAnswer={currentQuestion.answer}
                selected={selected}
                showCorrect={showCorrect}
                onSelect={handleAnswer}
            />
        </div>
    );
}
