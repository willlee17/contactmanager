import React, { Component } from 'react';
import Contact from './Contact';
import { Consumer } from '../../context';

class Contacts extends Component {
  render() {
    return(
      <Consumer>
        {value => {
          const { contacts } = value;
          return (
            <div>
              <h1 className="display-4 mb-2 text-center">
                <span className="text-danger">Contacts</span> List
              </h1>
              {contacts.map((contact) =>
                <Contact name={contact.name}
                         email={contact.email}
                         phone={contact.phone}
                         id={contact.id}
                         key={contact.id}
                       />
              )}
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default Contacts;
