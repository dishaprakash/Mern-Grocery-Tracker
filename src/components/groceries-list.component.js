import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Grocery = props => (
    <tr>
      <td>{props.grocery.username}</td>
      <td>{props.grocery.description}</td>
      <td>{props.grocery.quantity}</td>
      <td>
        <Link to={"/edit/"+props.grocery._id}>edit</Link> | <a href="#" onClick={() => { props.deleteGrocery(props.grocery._id) }}>delete</a>
      </td>
    </tr>
  )

export default class GroceriesList extends Component {
    constructor(props){
        super(props);
        this.deleteGrocery = this.deleteGrocery.bind(this)
        this.state = {groceries: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/groceries/')
          .then(response => {
            this.setState({ groceries: response.data })
          })
          .catch((error) => {
            console.log(error);
          })
        }

    deleteGrocery(id) {
        axios.delete('http://localhost:5000/groceries/'+id)
        .then(response => { console.log(response.data)});

        this.setState({
        groceries: this.state.groceries.filter(el => el._id !== id)
        })
    }

    groceriesList() {
        return this.state.groceries.map(currentgrocery => {
          return <Grocery grocery={currentgrocery} deleteGrocery={this.deleteGrocery} key={currentgrocery._id}/>;
        })
      }    

    render() {
        return (
            <div>
            <h3>Grocery List </h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Username</th>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                { this.groceriesList() }
              </tbody>
            </table>
          </div>
       )
   }
}