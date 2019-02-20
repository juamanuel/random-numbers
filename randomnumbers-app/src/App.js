import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  
  state = {numero: 0}

  componentDidMount() {
    this.handleRandom();
    console.log(this)
  }

  callApi = async (a) => {
    let response;
    if(a===undefined){
      response = await fetch(`/api/random`);
    } else{
      response = await fetch(`/api/random/${a}`);
    }
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  handleRandom(){
    this.callApi()
    .then(res => {
      let numero = res.number;
      this.setState({ numero: numero })
    })
    .catch(err => console.log(err));
  }

  handleRandomType(type){
    this.callApi(type)
    .then(res => {
      let numero = res.number;
      this.setState({ numero: numero })
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Números Random</h1>
        </header>
        <p className="App-intro">
          {this.state.numero}
        </p>
        <p>
          <button className="Btn" onClick={()=> this.handleRandom()}>Número Random</button>
          <button className="Btn" onClick={ ()=> this.handleRandomType("even")}>Número Random Par</button>
          <button className="Btn" onClick={ ()=> this.handleRandomType("odd")}>Número Random Impar</button>
        </p>
      </div>
    )
  }
}

export default App;