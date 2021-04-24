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

  getContactData() {
    fetch('https://reqres.in/api/users')
    .then(response => response.json())
    .then(
      response => {
        const contacts = [];
        contacts.push(response.data);
        if (response.total_pages > 1) {
          const apiPromises = [];
          const totalPages = response.total_pages;

          for (let i = totalPages; i > 1; i--) {
            apiPromises.push(fetch('https://reqres.in/api/users?page=' + i));
          }

          Promise.all(apiPromises)
          .then(responses => Promise.all(responses.map(response => response.json())))
          .then(responses => {
            responses.forEach(response => contacts.push(response.data))
            console.log(contacts)
            this.setState({ contacts: contacts.flat() })
          });
        } else {
          this.setState({ contacts: response.data })
        }
      }
    );
  }

  componentDidMount() {
    this.getContactData();
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
