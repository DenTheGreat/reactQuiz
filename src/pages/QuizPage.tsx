import React from 'react'

type ScoreEntry = {
    name: string
    score: number
}

type ScoreboardProps = {
    entries: ScoreEntry[]
}

const Scoreboard: React.FC<ScoreboardProps> = ({ entries }) => {
    const sorted = [...entries].sort((a, b) => b.score - a.score)

    return (
        <div className="p-4 bg-gray-800 text-white rounded shadow-md w-full max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Leaderboard</h2>
            <ul className="space-y-2">
                {sorted.map((entry, index) => (
                    <li
                        key={index}
                        className="flex justify-between items-center bg-gray-700 px-4 py-2 rounded"
                    >
                        <span className="font-medium">{index + 1}. {entry.name}</span>
                        <span className="text-yellow-400 font-bold">{entry.score}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Scoreboard