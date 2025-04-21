import { createContext, useContext, useState, ReactNode } from 'react';

type QuizContextType = {
    name: string;
    score: number;
    setName: (name: string) => void;
    setScore: (score: number) => void;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
    const [name, setName] = useState<string>('');
    const [score, setScore] = useState<number>(0);

    return (
        <QuizContext.Provider value={{ name, score, setName, setScore }}>
            {children}
        </QuizContext.Provider>
    );
};

export const useQuiz = () => {
    const context = useContext(QuizContext);
    if (!context) {
        throw new Error('useQuiz must be used within a QuizProvider');
    }
    return context;
};
