import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component.js";
import GroceriesList from "./components/groceries-list.component";
import EditGrocery from "./components/edit-grocery.component";
import AddGrocery from "./components/add-grocery.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className = "container">
        <Navbar />
        <br/>
        <Route path="/" exact component={GroceriesList} />
        <Route path="/edit/:id" component={EditGrocery} />
        <Route path="/create" component={AddGrocery} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
