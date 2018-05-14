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
      secondsElapsed: 0,
      showSecondsElapsed: false,
      correctAnswers: 0,      
    }

    this.onClickQuizButton = this.onClickQuizButton.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.selectAnswer = this.selectAnswer.bind(this)
    this.tickTime = this.tickTime.bind(this)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  tickTime() {
    this.setState({ secondsElapsed: this.state.secondsElapsed + 1 })
  }

  onClickQuizButton() {
    this.setState({ loading: true })
    this.timer = setInterval(this.tickTime, 1000)
    getQuestions((results) => {
      this.setState({
        showQuestions: true,
        quiz: results,
        loading: false,
      })
    })
  }

  selectAnswer(index, isCorrect) {
    const correctAnswers = this.state.correctAnswers
    if (isCorrect) {
      this.setState({ correctAnswers: correctAnswers + 1 })
    }
  }

  handleFormSubmit(event) {
    console.log('submitted', this.state.correctAnswers)
    clearInterval(this.timer)
    this.setState({ showSecondsElapsed: true })
    event.preventDefault()
  }

  render() {
    let questions
    let submitButton
    let secondsElapsed

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
      submitButton = <button>Submit Quiz</button>
    }

    if (this.state.showSecondsElapsed) {
      secondsElapsed = (
        <span className='time-log'>
          {`You got ${this.state.correctAnswers}/${this.state.quiz.length} answers in ${this.state.secondsElapsed} ${this.state.secondsElapsed > 1 ? 'seconds' : 'second'}!`}
        </span>
      )
      return (
        <div>
          {secondsElapsed}
          <button onMouseDown={this.onClickQuizButton}>Play Again</button>
        </div>
      )
    } else {
      return (
        <React.Fragment>
          { !this.state.showQuestions && <button onMouseDown={this.onClickQuizButton}>Start Quiz</button> }
          <form onSubmit={this.handleFormSubmit}>
            <div>{questions}</div>
            <div>{submitButton}</div>
          </form>
        </React.Fragment>
      )
    }
  }
}

export default QuizForm
