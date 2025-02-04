import React, { useState, useEffect, useRef } from 'react';
import './GeoQuiz.css';
import { data } from "../../assets/data";
import europeIcon from '../../assets/images/europe.png'; // Importa l'immagine PNG


const GeoQuiz = ({ questionType, difficulty, onResetQuiz}) => {
    console.log("Rendering GeoQuiz"); // Aggiungi questo per verificare se viene chiamato
    console.log("Selected Question Type:", questionType); // Debug
    console.log("Selected Difficulty:", difficulty);     // Debug

  // Filtra le domande in base alla tipologia e difficoltà
  const filteredQuestions = data[questionType]?.[difficulty] || [];
  const totalQuestions = filteredQuestions.length;

 
     let [index, setIndex] = useState(0);
     let [question,setQuestion] = useState(filteredQuestions[0] || {});
     let [lock,setLock] = useState(false);
     const [attempts, setAttempts] = useState(0);  // Traccia il numero di tentativi
     let [result,setResult] = useState(false);
     
     let option1 = useRef(null);
     let option2 = useRef(null);
     let option3 = useRef(null);
     let option4 = useRef(null);
     const option_array = [option1, option2, option3, option4];

     let [score,setScore] = useState(0);
     const [quizFinished, setQuizFinished] = useState(false);
    
     const questions = data[questionType]?.[difficulty] || [];
     

 const checkAns = (e, ans) => {
  if (attempts < 2) {
     if (question.ans === ans) {
       e.target.classList.add("correct");
       setScore((prev) => prev+1);
       setLock(true);
  } else {
       e.target.classList.add("wrong");
  }
       setAttempts((prevAttempts) => prevAttempts + 1);  // Incrementa i tentativi
      
 }

   // Se sono stati fatti 2 tentativi (sia corretti che sbagliati), blocca la possibilità di rispondere
   if (attempts >= 1) {
    setLock(true);  // Blocca le risposte
  }
};
     // Funzione per il pulsante "Next"
  const handleNext = () => {
    if (lock) {
      // Se siamo all'ultima domanda, mostra il risultato finale
      if (index === totalQuestions - 1) {
        setQuizFinished(true);
      } else {
        setIndex((prevIndex) => prevIndex + 1);
      }
      setLock(false);
      setAttempts(0); // Reset dei tentativi per la domanda successiva
    }
  };
  
     useEffect(() => {
      // Aggiorna la domanda ogni volta che l'indice cambia
      if (filteredQuestions[index]) {
        setQuestion(filteredQuestions[index]); // Aggiorna la domanda corrente
      }
      
      // Resetta il numero di tentativi
      setAttempts(0);
    
      // Rimuove le classi "correct" e "wrong" da tutte le opzioni
      option_array.forEach((option) => {
        if (option.current) {
          option.current.classList.remove("correct", "wrong");
        }
      });
    }, [index, filteredQuestions]); // Esegui il cambio della domanda e resetta le opzioni ogni volta che l'indice cambia
    

      return (
    <div className='container'>
        <h1><span>Geo</span>Quiz App<img src={europeIcon} alt="Europe Icon" className="rotating-horizontal" style={{ width: '40px', marginRight: '10px' }} />
       </h1>
        <hr />
   
     {/* Controllo per il caso di domande vuote */}
     {filteredQuestions.length === 0 ? (
      <div className="no-questions">
        <h2>Nessuna domanda trovata</h2>
        <p>Non ci sono domande disponibili per i parametri selezionati.</p>
        <button onClick={onResetQuiz}>Ricomincia</button>
      </div>
     ):  quizFinished ? (
      // Schermata finale con il punteggio
      <div className='quiz-end'>
        <h2>Risultato Finale</h2>
        <p>Hai completato il quiz! <br />Il tuo punteggio finale è:  {score}  / {totalQuestions}</p>
        <button onClick={onResetQuiz}>Ricomincia</button>
      </div>
      
    ) : (
      // Quiz in corso
      <div className='quiz-content'>

        <h2>{index+1}.{question.question}</h2>
        <ul className="options">
            <li ref={option1} onClick={(e)=>{checkAns(e,question.option1)}}>{question.option1}</li>
            <li ref={option2} onClick={(e)=>{checkAns(e,question.option2)}}>{question.option2}</li>
            <li ref={option3} onClick={(e)=>{checkAns(e,question.option3)}}>{question.option3}</li>
            <li ref={option4}onClick={(e)=>{checkAns(e,question.option4)}}>{question.option4}</li>
            </ul>
            <button onClick={handleNext}>Next</button>
        

            <div className="index">{index+1} of {totalQuestions} questions</div>
            <div className="score">Score: {score}</div>
            </div>
    )}
 </div>
  );

};


export default GeoQuiz;