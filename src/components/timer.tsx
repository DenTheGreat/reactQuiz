import {useEffect, useState} from "react";

export default function TimerDisplay ({
                                          initialTime,
                                          onTimeUp,
                                          questionId }: {
    initialTime: number,
    onTimeUp: () => void,
    questionId:number}) {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        setTimeLeft(initialTime);
    }, [initialTime, questionId]);


    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    onTimeUp();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [onTimeUp]);


    return (
        <div className="mb-4">
            <h2 className="text-xl font-semibold">Time Left: {timeLeft}s</h2>
        </div>
    );
};