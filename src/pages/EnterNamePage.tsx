import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';

export default function EnterNamePage () {
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const { setName: setUserName } = useQuiz();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setUserName(name);
        navigate('/quiz');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-white">
            <h1 className="text-2xl font-bold mb-4">Enter Your Name</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-2 mb-4 text-white border-amber-300 border-2 font-bold rounded"
                    placeholder="Enter your name"
                />
                <button type="submit" className="p-2 text-white rounded border-red-300 border-2">
                    Start Quiz
                </button>
            </form>
        </div>
    );
};

