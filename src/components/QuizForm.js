import React, { Component } from 'react'
import Answers from './Answers'
import { getQuestions } from '../apis/quiz'
import loader from '../img/loader.svg'

class QuizForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showQuestions: false,
      quiz: [],
      loading: false,
    }

    this.onClickQuizButton = this.onClickQuizButton.bind(this)
    this.selectAnswer = this.selectAnswer.bind(this)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  onClickQuizButton() {
    this.setState({ loading: true })
    getQuestions((results) => {
      this.setState({
        showQuestions: true,
        quiz: results,
        loading: false,
        correctAnswers: 0
      })
    })
  }

  selectAnswer(index, isCorrect) {
    const correctAnswers = this.state.correctAnswers
    if (isCorrect) {
      this.setState({ correctAnswers: correctAnswers + 1 })
    }
  }

  render() {
    let questions
    if (this.state.loading) {
      questions = <img src={loader} className="loader" alt="Loading..." />
    }
    
    if (this.state.showQuestions) {
      questions = this.state.quiz.map((eachQuiz, index) => {
        return (
          <div key={index}>
            <span className='question' dangerouslySetInnerHTML={{__html: eachQuiz.question }} />
            <Answers index={index} quiz={eachQuiz} selectAnswer={(answer) => this.selectAnswer(index, answer)} />
          </div>
        )
      })
    }
    return (
      <React.Fragment>
        <button onMouseDown={this.onClickQuizButton}>Start Quiz</button>
        <form onSubmit={this.handleFormSubmit}>
          <div>{questions}</div>
        </form>
      </React.Fragment>
    )
  }
}

export default QuizForm
