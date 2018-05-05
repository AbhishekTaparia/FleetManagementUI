import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import add from '../../assets/img/add.png';
import URL from '../../actions/index';
class App extends Component {


  constructor(){
    super()
    this.state={
        driver_data:[]
    }
  }

  componentDidMount(){
    axios.get(`${URL}/drivers`)
      .then(response=>{
        const driver_data=response.data;
        this.setState({driver_data});
      })
  }

  renderList = ({driver_data}) => {
    if(driver_data){
      return driver_data.map((item)=>{
        return(
          <div key={item.did} className="item-list">
              
                <div >
                  <Link key={item.did} to={`driverindividual/${item.did}`} className="link-class">
                  <div className="title">{item.dname}</div>
                  </Link>
                
              </div>
              {/* <div className="sender">Joining Date:<span>{item.joining_date}</span></div>
              <div className="sender">{item.id_proof}</div>
              <div className="sender">{item.address}</div>
              <div className="sender">{item.mobile_no}</div>
              <div className="sender">{item.licence_no}</div> */}
          </div>
        )
      })
    }
  }


  render() {
    return (
      <div className="App">
        <div className="top">
        <h3>&nbsp; &nbsp;Drivers        </h3>
        <Link to="/driverform">&nbsp;&nbsp;&nbsp;<img src={add} width="30px" height="30px"/></Link>
        </div>
        <div className="messages_container">
          {this.renderList(this.state)}
        </div>
      </div>
    );
  }
}


export default App;