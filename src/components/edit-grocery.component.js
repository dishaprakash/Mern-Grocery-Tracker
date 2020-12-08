import React, { Component } from 'react';
import axios from 'axios';

export default class EditGrocery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            description: '',
            quantity: 0,
            users: []
          }
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/groceries/'+this.props.match.params.id)
        .then(response => {
        this.setState({
          username: response.data.username,
          description: response.data.description,
          quantity: response.data.quantity,
          })   
        })
        .catch(function (error) {
        console.log(error);
        })


        axios.get('http://localhost:5000/users/')
        .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username)
          })
        }
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    onChangeUsername(e) {
        this.setState({
          username: e.target.value
        })
      }

      onChangeDescription(e) {
        this.setState({
          description: e.target.value
        })
      }
    
      onChangeQuantity(e) {
        this.setState({
          quantity: e.target.value
        })
      }

      onSubmit(e) {
        e.preventDefault();
        const grocery = {
            username: this.state.username,
            description: this.state.description,
            quantity: this.state.quantity,
          }
        console.log(grocery);
        axios.post('http://localhost:5000/groceries/update/'+this.props.match.params.id, grocery)
        .then(res => console.log(res.data));

        window.location = '/';
        }

    render() {
        return (
            <div>
            <h3>Edit Grocery List</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
                <label>Username: </label>
                <select ref="userInput"
                    required
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}>
                    {
                      this.state.users.map(function(user) {
                        return <option 
                          key={user}
                          value={user}>{user}
                          </option>;
                      })
                    }
                </select>
              </div>
              <div className="form-group"> 
                <label>Item (with Description): </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    />
              </div>
              <div className="form-group">
                <label>Quantity: </label>
                <input 
                    type="text" 
                    className="form-control"
                    value={this.state.quantity}
                    onChange={this.onChangeQuantity}
                    />
              </div>
      
              <div className="form-group">
                <input type="submit" value="Edit Grocery List" className="btn btn-primary" />
              </div>
            </form>
          </div>
       )
   }
}