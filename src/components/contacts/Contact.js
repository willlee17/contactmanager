import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Consumer } from '../../context';
import axios from 'axios';
import { Link } from 'react-router-dom';


class Contact extends Component {
  constructor() {
    super();
    this.state = {
      showContactInfo: false
    }
  }

  onShowClick = () => {
    this.setState({
      showContactInfo: !this.state.showContactInfo
    })
  }

  onDeleteClick = async (id, dispatch) => {
    // axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
    //   .then(res => {  dispatch({
    //       type: "DELETE_CONTACT",
    //       payload: id
    //     })
    //   })
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
    dispatch({
          type: "DELETE_CONTACT",
          payload: id
        })
  }

  render() {
    const { name, email, phone, id} = this.props;

    return(
      <Consumer>
        {value => {
          const { dispatch } = value;
          return(
            <div className="card card-body mb-3">
              <h4>
                {name}{' '}
                <i onClick={this.onShowClick} className="fa fa-sort-down" style={{cursor: 'pointer'}}/>
                <i onClick={this.onDeleteClick.bind(this, id, dispatch)} className="fa fa-times"
                  style={{cursor: 'pointer', float: 'right', color: 'red'}}/>
                  <Link to={`contact/edit/${id}`}>
                    <i className="fa fa-pencil"
                       style={{cursor: 'pointer', float: 'right', color:'black', marginRight: '1rem'}}/>
                  </Link>
              </h4>
              {this.state.showContactInfo ? (<ul className="list-group">
                <li className="list-group-item">{email}</li>
                <li className="list-group-item">{phone}</li>
              </ul>) : null }
            </div>
          )
        }}
      </Consumer>
    )
  }
}

Contact.propTypes = {
  name: propTypes.string.isRequired,
  email: propTypes.string.isRequired,
  phone: propTypes.string.isRequired,
}

export default Contact;
