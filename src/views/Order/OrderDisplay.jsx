import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import add from '../../assets/img/add.png';
import URL from '../../actions/index';

class App extends Component {

  constructor(){
    super()
    this.state={
        order_data:[],
        client_data:[]
    }
  }

  componentDidMount(){
    axios.get(`${URL}/orders`)
      .then(response=>{
        const order_data=response.data;
        this.setState({order_data});
      })
      axios.get(`${URL}/client`)
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
          
          <div key={item.oid} className="item-list">
              {console.log(item)}
              <div >
                  <Link key={item.oid} to={`orderindividual/${item.oid}`} className="link-class">
                  <div className="title">{item.oid}</div>
                  </Link>
                
              </div>
              {/* <div className="title">{item.company_name}</div>
              <div className="sender">Wheels:<span>{item.wheels}</span></div>
              <div className="sender">{item.model_no}</div>
              <div className="sender">{item.owner_name}</div> */}
          </div>
        )
      })
    }
  }


  render() {
    return (
      <div className="App">
        <div className="top">
        <h3>&nbsp; &nbsp;Orders        </h3>
        <Link to="/ordersform">&nbsp;&nbsp;&nbsp;<img src={add} width="30px" height="30px"/></Link>
        </div>
        <div className="messages_container">
          {this.renderList(this.state)}
        </div>
      </div>
    );
  }
}


export default App;