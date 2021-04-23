import './App.css';
import { Component } from 'react';

import { CardList } from './components/card-list/card-list.component'

class App extends Component {
  constructor() {
    super();

    this.state = {
      contacts: []
    }
  }

  componentDidMount() {
    fetch('https://reqres.in/api/users?page=1')
    .then(response => response.json())
    .then(users => this.setState({ contacts: users.data }));
  }

  render() {
    return (
      <div className="App">
        <CardList contacts={this.state.contacts}/>       
      </div>
    );
  }
}

export default App;
