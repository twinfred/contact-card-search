import React from 'react';
import './card-list.css';
import { Card } from '../card/card.component';

export const CardList = props => {
  return (
    <div className="card-list">
      {
        props.contacts.map(contact => (
          <Card key={contact.id} contact={contact}/>
        ))
      } 
    </div>
  )
}