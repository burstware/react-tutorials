// @ts-nocheck

import React, { Component } from 'react'

export default class Info extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      toggled: false,
      form: {}
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  //display html when saved
  //when edited, bring back the inputs

  onSubmit(e) {
    e.preventDefault()
  }

  handleChange(newForm) {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        ...newForm
      }
    })
  }

  render() {
    console.log('this.state', this.state)
    return (
      <div className="info">
        <div>
          <h2 className="title"> Personal Information </h2>
        </div>
        <form action="#" noValidate onSubmit={this.onSubmit}>
          <div className="personal-info">
            <div>
              <label htmlFor="fName"></label>
              <input
                type="text"
                id="fName"
                name="fName"
                placeholder="First Name"
                onChange={(e) =>
                  this.handleChange({
                    fName: e.currentTarget.value
                  })
                }
                value={this.state.form.fName}
              ></input>
            </div>
            <div>
              <label htmlFor="lName"></label>
              <input
                type="text"
                id="lName"
                name="lName"
                placeholder="Last Name"
                onChange={(e) =>
                  this.handleChange({
                    lName: e.currentTarget.value
                  })
                }
                value={this.state.form.lName}
              ></input>
            </div>
            <div>
              <label htmlFor="location"></label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Location"
                onChange={(e) =>
                  this.handleChange({
                    location: e.currentTarget.value
                  })
                }
                value={this.state.form.location}
              ></input>
            </div>
            <div>
              <label htmlFor="email"></label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                onChange={(e) =>
                  this.handleChange({
                    email: e.currentTarget.value
                  })
                }
                value={this.state.form.email}
              ></input>
            </div>
            <div>
              <label htmlFor="phone"></label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="phone"
                onChange={(e) =>
                  this.handleChange({
                    phone: e.currentTarget.value
                  })
                }
                value={this.state.form.phone}
              ></input>
            </div>
          </div>
          <div className="personal-btn-groups">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    )
  }
}
