import React from 'react';

import './card.css';

export const Card = props => (
  <div className="card-container">
    <img src={`https://robohash.org/${props.contact.id}?set=set4&size=180x180`} alt=""/>
    <h2>{props.contact.first_name} {props.contact.last_name}</h2>
    <p>{props.contact.email}</p>
  </div>
)