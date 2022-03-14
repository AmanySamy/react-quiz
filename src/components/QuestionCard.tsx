import React from 'react'
import { AnswerObject } from '../App'
import { ButtonWrapper, Wrapper } from './QuestionCard.styles'

type Props = {
    question: string,
    answers: string[],
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void,
    userAnswer?: AnswerObject,
    questionNr: number,
    totalQuestions: number
}

const QuestionCard: React.FC<Props> = ({ question, answers, callback, userAnswer, questionNr, totalQuestions }) => {
    return (
        <Wrapper>
            <p className="number">
                Question:{questionNr} / {totalQuestions}
            </p>
            <p className="question" dangerouslySetInnerHTML={{ __html: question }}></p>
            <div className="answers">
                {answers.map(ans => (
                    <ButtonWrapper
                        correct={userAnswer?.correctAnswer === ans}
                        userClicked={userAnswer?.answer === ans}
                        key={ans}>
                        <button disabled={userAnswer ? true : false} onClick={callback} value={ans}>
                            <span dangerouslySetInnerHTML={{ __html: ans }}></span>
                        </button>
                    </ButtonWrapper>
                ))}
            </div>
        </Wrapper>
    )
}
export default QuestionCard;