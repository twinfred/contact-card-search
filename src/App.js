import './App.css';
import { Component } from 'react';

import { CardList } from './components/card-list/card-list.component'
import { SearchBox } from './components/search-box/search-box.component';

class App extends Component {
  constructor() {
    super();

    this.state = {
      contacts: [],
      searchValue: '',
    }
  }

  getContactData() {
    fetch('https://reqres.in/api/users')
    .then(response => response.json())
    .then(
      response => {
        let contacts = [];
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
            responses.forEach(response => contacts.push(response.data));

            contacts = contacts.flat().sort((firstItem, secondItem) => {
              const firstItemName = [firstItem.first_name.toLowerCase(), firstItem.last_name.toLowerCase()].join(' ');
              const secondItemName = [secondItem.first_name.toLowerCase(), secondItem.last_name.toLowerCase()].join(' ');

              if (firstItemName < secondItemName) {
                return - 1;
              }

              if (firstItemName > secondItemName) {
                return 1;
              }

              return 0;
            });

            this.setState({ contacts });
          });
        } else {
          this.setState({ contacts: response.data });
        }
      }
    );
  }

  componentDidMount() {
    this.getContactData();
  }

  filterContacts = (event) => {
    this.setState({ searchValue: event.target.value });
  }

  render() {
    const { contacts, searchValue } = this.state;
    const filteredContacts = contacts.filter(contact =>
      [contact.first_name, contact.last_name].join(' ').toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
      <div className="App">
        <SearchBox label="Search Contacts" filterContacts={this.filterContacts} />
        <CardList contacts={filteredContacts}/>
      </div>
    );
  }
}

export default App;
