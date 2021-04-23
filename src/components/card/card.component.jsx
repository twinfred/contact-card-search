import React from 'react';

import './card.css';

export const Card = props => (
  <div className="card-container">
    <img src={props.contact.avatar} alt=""/>
    <h2>{props.contact.first_name} {props.contact.last_name}</h2>
    <p>{props.contact.email}</p>
  </div>
)