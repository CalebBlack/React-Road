import React, { Component } from 'react';
import {Switch,Route} from 'react-router-dom';
import pagemap from './pages/map';
import './app.css';
import Header from './header';

const pages = pagemap.map((page)=>{return (<Route exact path={page[1]} component={page[0]}/>)})

class App extends Component {
  render() {
    return (
      <div id='app'>
        <Header/>
        <Switch>
        {pages}
        </Switch>
      </div>
    );
  }
}


export default App;
