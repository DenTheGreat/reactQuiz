import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EnterNamePage from "./pages/EnterNamePage";
import QuizPage from "./pages/QuizPage";
import ScorePage from "./pages/ScorePage";
import {QuizProvider} from "./context/QuizContext.tsx";

const App = () => {
    return (
        <QuizProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<EnterNamePage />} />
                    <Route path="/quiz" element={<QuizPage />} />
                    <Route path="/score" element={<ScorePage />} />
                </Routes>
            </Router>
        </QuizProvider>
    );
};

export default App;
