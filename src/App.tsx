import ScorePage from './pages/ScorePage'

function App() {
    return (
        <div className="min-h-screen bg-gray-900 text-white p-4">
            <ScorePage name="TestUser" score={7} />
        </div>
    )
}

export default App