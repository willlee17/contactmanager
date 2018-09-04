import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

class AddContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {

    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;

    // Error Checking
    if (name==='') {
      this.setState({errors: {name: 'Name is required'}})
    }
    if (email==='') {
      this.setState({errors: {email: 'Email is required'}})
    }
    if (phone==='') {
      this.setState({errors: {phone: 'Phone is required'}})
    }

    const newContact = {
      name: name,
      email: email,
      phone: phone,
    }

     const res = await axios.post('https://jsonplaceholder.typicode.com/users', newContact)
     dispatch({
        type: "ADD_CONTACT",
        payload: res.data,
      })

    // Clear State
    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {},
    })

    // Redirect to home page
    this.props.history.push('/');
  }

  render() {
    const{ name, email, phone} = this.state;

    return(
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">
                Add Contact
              </div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    type="text"
                    placeholder="Please enter contact's name"
                    value={name}
                    onChange={this.onChange}
                  />
                  <TextInputGroup
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Please enter contact's email"
                    value={email}
                    onChange={this.onChange}
                  />
                  <TextInputGroup
                    label="Phone"
                    type="text"
                    name="phone"
                    placeholder="Please enter contact's phone number"
                    value={phone}
                    onChange={this.onChange}
                  />

                  <input type="submit" value="Add Contact!" className="btn btn-light btn-block"/>
                </form>
              </div>
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default AddContact;
