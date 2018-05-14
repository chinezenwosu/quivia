import React, { Component } from 'react'
import Answers from './Answers'
import { getQuestions } from '../apis/quiz'
import loader from '../img/loader.svg';

class QuizForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showQuestions: false,
      quiz: [],
      loading: false,
    }

    this.onClickQuickButton = this.onClickQuickButton.bind(this)
  }

  onClickQuickButton() {
    this.setState({ loading: true })
    getQuestions((results) => {
      console.log('clicked', results)
      this.setState({
        showQuestions: true,
        quiz: results,
        loading: false,
      })
    })
  }

  handleFormSubmit() {
    console.log('submitted')
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
            <Answers quiz={eachQuiz} />
          </div>
        )
      })
    }
    return (
      <React.Fragment>
        <button onMouseDown={this.onClickQuickButton}>Start Quiz</button>
        <form onSubmit={this.handleFormSubmit}>
          <div>{questions}</div>
        </form>
      </React.Fragment>
    );
  }
}

export default QuizForm;
