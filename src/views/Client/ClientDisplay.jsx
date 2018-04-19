import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';



class App extends Component {

    constructor(){
      super()
      this.state={
          client_data:[]
      }
    }

    componentDidMount(){
      axios.get('http://localhost:3004/clients')
        .then(response=>{
          const client_data=response.data;
          this.setState({client_data});
        })
    }

    

  renderList = ({client_data}) => {
      
    if(client_data){
      return client_data.map((item)=>{
        return(
          <div key={item.id} className="item-list">
              <div className="title">{item.company_name}</div>
              <div className="sender">Contact:<span>{item.contact}</span></div>
              <div className="sender">{item.address}</div>
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
          <Link to="/clientsform">Add</Link>
        </div>
        <div className="messages_container">
            {this.renderList(this.state)}
        </div>
      </div>
    );
  }
}

export default App;
