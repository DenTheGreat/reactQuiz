import { useEffect, useState } from 'react'

type Entry = {
    name: string
    score: number
}

export default function ScorePage({ name, score }: { name: string; score: number }) {
    const [leaderboard, setLeaderboard] = useState<Entry[]>([])

    useEffect(() => {
        fetch('/data/leaderboard.json')
            .then(res => res.json())
            .then(data => setLeaderboard(data))
    }, [])

    return (
        <div className="p-6 text-center text-white">
            <h1 className="text-2xl font-bold mb-4">Well done, {name}!</h1>
            <p className="text-xl mb-6">Your Score: <span className="font-bold">{score}</span></p>

            <h2 className="text-xl font-semibold mb-2">Leaderboard</h2>
            <ul className="bg-gray-800 rounded p-4 max-w-md mx-auto">
                {leaderboard
                    .sort((a, b) => b.score - a.score)
                    .map((entry, i) => (
                        <li key={i} className="flex justify-between py-1 border-b border-gray-600 last:border-none">
                            <span>{entry.name}</span>
                            <span>{entry.score}</span>
                        </li>
                    ))}
            </ul>
        </div>
    )
}
