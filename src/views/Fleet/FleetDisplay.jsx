import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



class App extends Component {

  constructor(){
    super()
    this.state={
        fleet_data:[]
    }
  }

  componentDidMount(){
    axios.get('http://localhost:3004/fleets')
      .then(response=>{
        const fleet_data=response.data;
        this.setState({fleet_data});
      })
  }


  renderList = ({fleet_data}) => {
    if(fleet_data){
      return fleet_data.map((item)=>{
        return(
          <div key={item.id} className="item-list">
              <div className="title">{item.company_name}</div>
              <div className="sender">Wheels:<span>{item.wheels}</span></div>
              <div className="sender">{item.model_no}</div>
              <div className="sender">{item.owner_name}</div>
          </div>
        )
      })
    }
  }


  render() {
    return (
      <div className="App">
        <div className="top">
          <h3>Messages</h3>
          <Link to="/fleetform">Add</Link>
        </div>
        <div className="messages_container">
          {this.renderList(this.state)}
        </div>
      </div>
    );
  }
}


export default App;