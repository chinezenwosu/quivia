import React, { Component } from 'react';

class Answers extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedAnswer: ''
    }

    this.selectRadio = this.selectRadio.bind(this)
  }

  componentWillMount() {
    const quiz = this.props.quiz
    const incorrectAnswers = quiz.incorrect_answers
    const randomCorrectAnswerPosition = Math.floor((Math.random() * incorrectAnswers.length) + 1);
    incorrectAnswers.splice(randomCorrectAnswerPosition, 0, quiz.correct_answer)
    this.allAnswers = incorrectAnswers
  }

  selectRadio(event) {
    const isCorrect = event.target.value === this.props.quiz.correct_answer
    this.setState({ selectedAnswer: event.target.value })
    this.props.selectAnswer(this.props.index, isCorrect)
  }

  render() {
    const answers = this.allAnswers.map((answer, index) => {
      return (
        <div key={index}>
          <input
            type="radio"
            value={answer}
            name={this.props.index}
            checked={this.state.selectedAnswer === answer}
            onChange={this.selectRadio}
          />
          <label dangerouslySetInnerHTML={{__html: answer }} />
        </div>
      );
    })

    return answers
  }
}

export default Answers;
