import { useEffect } from 'react'

type TimerProps = {
    time: number
    setTime: React.Dispatch<React.SetStateAction<number>>
    onTimeout: () => void
}

const Timer = ({ time, setTime, onTimeout }: TimerProps) => {
    useEffect(() => {
        if (time <= 0) return

        const interval = setInterval(() => {
            setTime(prev => {
                if (prev <= 1) {
                    onTimeout()
                    clearInterval(interval)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [time])

    return <div className="mt-4 text-center text-lg">Time left: {time}s</div>
}

export default Timer
