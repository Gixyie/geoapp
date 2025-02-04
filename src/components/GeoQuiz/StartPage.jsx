import React, {useState} from 'react';
import './StartPage.css';


function StartPage ({ onStartQuiz })  {
    const [questionType, setQuestionType] = useState('capitals');
    const [difficulty, setDifficulty] = useState('easy');
  
    const handleStartQuiz = () => {
      if (!questionType || !difficulty) {
        alert('Seleziona una tipologia');
        return;
      }
      onStartQuiz(questionType, difficulty);
    };
    
    
 
    

    return (
      <div className="start-page">
        <h1>Benvenuto nel <span>Geo</span>Quiz!</h1>
        <div className="settings">
        <label>
          Tipologia Domande:
          <select value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
            <option value="capitals">Capitals</option>
            <option value="borders">Borders</option>
          
          </select>
        </label>
        <label>
          Difficoltà:
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
      </div>
        <button onClick={handleStartQuiz}>Inizia Quiz</button>
      </div>
      
    );
  };
  

export default StartPage;