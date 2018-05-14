import React from 'react'
import ReactDOM from 'react-dom'
import App from '../components/App'
import { getQuestions } from '../apis/quiz'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('pulls 10 questions from the opentdb api', (done) => {
  // Test api call
  // This does not work
  const callback = (result) => {
    return result
  }
  const questions = getQuestions(callback)
  const questions = await getQuestions(callback)
  expect(questions.length).toEqual(10);
  done()
});
