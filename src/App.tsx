import React, { useState } from 'react';
import { Difficulty, fetchQuizQuestions, QuestionState } from './API';
import { GlobalStyle, Wrapper } from './App.styles';
import QuestionCard from './components/QuestionCard';



const TOTAL_QUESTIONS = 10;
export type AnswerObject = {
  question: string,
  correct: boolean,
  correctAnswer: string,
  answer: string
}
const App = () => {
  const [Loading, setLoading] = useState(false)
  const [Questions, setQuestions] = useState<QuestionState[]>([])
  const [UserAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [Number, setNumber] = useState(0)
  const [Score, setScore] = useState(0)
  const [GameOver, setGameOver] = useState(true)


  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    setQuestions(newQuestions)
    setScore(0);
    setUserAnswers([]);
    setNumber(0)
    setLoading(false)

  }
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!GameOver) {
      const answer = e.currentTarget.value;
      const correct = Questions[Number].correct_answer === answer
      if (correct) setScore(prev => prev + 1)

      const answerObject = {
        question: Questions[Number].question,
        correct,
        answer,
        correctAnswer: Questions[Number].correct_answer,
      }
      setUserAnswers((prev) => [...prev, answerObject])
    }
  }
  const nextQuestion = () => {
    const next_question = Number + 1
    if (next_question === TOTAL_QUESTIONS) {
      setGameOver(true)
    } else {
      setNumber(next_question)
    }
  }
  console.log(UserAnswers,Number)
  return (
    <Wrapper>
      <GlobalStyle />
      <h1>Quiz App </h1>
      {GameOver || UserAnswers.length === TOTAL_QUESTIONS ? <button className="start" onClick={startTrivia}>Start</button> : null}
      {!GameOver && <p className="score">Score:{ Score }</p>}
      {Loading && <p className="loading" > Loading Questions</p >}
      {!Loading && !GameOver && <QuestionCard
        question={Questions[Number].question}
        answers={Questions[Number].answers}
        callback={checkAnswer}
        questionNr={Number + 1}
        totalQuestions={TOTAL_QUESTIONS}
        userAnswer={UserAnswers ? UserAnswers[Number] : undefined}
      />}
      {!GameOver && !Loading && UserAnswers.length === Number + 1 && Number !== TOTAL_QUESTIONS - 1
        ? <button className="next" onClick={nextQuestion}>Next</button>
        : null
      }

    </Wrapper>
  );
}

export default App;
