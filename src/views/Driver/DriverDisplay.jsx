import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class App extends Component {


  constructor(){
    super()
    this.state={
        driver_data:[]
    }
  }

  componentDidMount(){
    axios.get('http://localhost:3004/drivers')
      .then(response=>{
        const driver_data=response.data;
        this.setState({driver_data});
      })
  }

  renderList = ({driver_data}) => {
    if(driver_data){
      return driver_data.map((item)=>{
        return(
          <div key={item.id} className="item-list">
              <div className="title">{item.driver_name}
                <div >
                  <Link key={item.id} to={`driverform/${item.id}`} className="link-class">
                    Edit
                  </Link>
                </div>
              </div>
              <div className="sender">Joining Date:<span>{item.joining_date}</span></div>
              <div className="sender">{item.id_proof}</div>
              <div className="sender">{item.address}</div>
              <div className="sender">{item.mobile_no}</div>
              <div className="sender">{item.licence_no}</div>
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
          <Link to="/driverform">Add</Link>
        </div>
        <div className="messages_container">
          {this.renderList(this.state)}
        </div>
      </div>
    );
  }
}


export default App;