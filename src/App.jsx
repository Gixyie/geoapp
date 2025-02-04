import React, { useState } from 'react';

import GeoQuiz from "./components/GeoQuiz/GeoQuiz";
import StartPage from './components/GeoQuiz/StartPage';
import './components/GeoQuiz/GeoQuiz.css';


  const App = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [quizStarted, setQuizStarted] = useState(false);
    const [score, setScore] = useState(0);
    const [questionType, setQuestionType] = useState('');
    const [difficulty, setDifficulty] = useState('');

    const startQuiz = (selectQuestionType, selectedDifficulty) => {
      console.log("Inizio..", selectQuestionType, selectedDifficulty);
      setQuestionType(selectQuestionType);
      setDifficulty(selectedDifficulty);
      setQuizStarted(true);
    };
  
    const resetQuiz = () => {
      setQuestionType('');
      setDifficulty('');
      setQuizStarted(false);
    };

    const nextQuestion = () => {
      if (currentQuestion < GeoQuiz.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setCurrentQuestion(0);
      }};

    
      return (
        <div>
            {!quizStarted ? (
                <StartPage onStartQuiz={startQuiz} />
            ) : (
                <GeoQuiz 
                questionType={questionType}
                difficulty={difficulty}
                onResetQuiz={resetQuiz}
                />
            )}
        </div>
    );
};


   
  
  
  



export default App;