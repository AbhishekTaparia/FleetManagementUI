import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



class App extends Component {

  constructor(){
    super()
    this.state={
        order_data:[],
        client_data:[]
    }
  }

  componentDidMount(){
    axios.get('http://localhost:3004/orders')
      .then(response=>{
        const order_data=response.data;
        this.setState({order_data});
      })
      axios.get('http://localhost:3004/client')
      .then(response=>{
        const client_data=response.data;
        this.setState({client_data});
      })
  }


  renderList = ({order_data}) => {
    if(order_data){
      return order_data.map((item)=>{
          if(item)
        return(
          <div key={item.id} className="item-list">
              <div className="title">{item.client}</div>
              <div className="sender">Wheels:<span>{item.distance}</span></div>
              <div className="sender">{item.order_date}</div>
              <div className="sender">{item.address}</div>
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
          <Link to="/orderform">Add</Link>
        </div>
        <div className="messages_container">
          {this.renderList(this.state)}
        </div>
      </div>
    );
  }
}


export default App;