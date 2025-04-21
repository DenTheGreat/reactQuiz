import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import QuestionCard from '../components/QuestionCard';
import { Question } from '../types';

const TimerDisplay = ({ initialTime, onTimeUp }: { initialTime: number, onTimeUp: () => void }) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        setTimeLeft(initialTime);
    }, [initialTime]);


    useEffect(() => {
        if (timeLeft <= 0) {
            onTimeUp();
            return;
        }

        const interval = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft, onTimeUp]);

    return (
        <div className="mb-4">
            <h2 className="text-xl font-semibold">Time Left: {timeLeft}s</h2>
        </div>
    );
};

export default function QuizPage() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const [showCorrect, setShowCorrect] = useState(false);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(30);
    const navigate = useNavigate();

    const { name: userName, setScore: setGlobalScore } = useQuiz();


    useEffect(() => {
        fetch('/data/questions.json')
            .then((res) => res.json())
            .then((data) => setQuestions(data))
            .catch((err) => console.error('Failed to load questions', err));
    }, []);

    const currentQuestion = questions[currentIndex];

    const handleAnswer = useCallback((option: string) => {
        if (selected) return;

        if (!currentQuestion) return;

        const isCorrect = option === currentQuestion.answer;
        const newScore = isCorrect ? score + 1 : score;

        setScore(newScore);
        setGlobalScore(newScore);

        setSelected(option);
        setShowCorrect(true);

        setTimeout(() => {
            const isLastQuestion = currentIndex + 1 >= questions.length;

            if (isLastQuestion) {
                navigate('/score', { state: { name: userName, score: newScore } });
            } else {
                setCurrentIndex((prev) => prev + 1);
                setSelected(null);
                setShowCorrect(false);
                setTimer(30);
            }
        }, 3000);
    }, [currentQuestion, currentIndex, questions.length, score, selected, navigate, userName, setGlobalScore]);

    // Handle timeout
    const handleTimeout = useCallback(() => {
        handleAnswer('');
    }, [handleAnswer]);

    if (!currentQuestion) {
        return <div className="text-white p-4">Loading questions...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-white">
            <TimerDisplay
                initialTime={timer}
                onTimeUp={handleTimeout}
            />
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