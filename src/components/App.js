import React, { Component } from 'react';
import '../styles/App.css';
import QuizForm from './QuizForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Quivia</h1>
        </header>
        <QuizForm />
      </div>
    );
  }
}

export default App;
