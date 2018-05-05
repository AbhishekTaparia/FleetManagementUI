import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import add from '../../assets/img/add.png';
import URL from '../../actions/index'

class App extends Component {

    constructor(){
      super()
      this.state={
          client_data:[]
      }
    }

    componentDidMount(){
      axios.get(`${URL}/clients`)
        .then(response=>{
          const client_data=response.data;
          this.setState({client_data});
          console.log(response.data)
        })
    }

    

  renderList = ({client_data}) => {
      
    if(client_data){
      return client_data.map((item)=>{
        return(
          <div key={item.cid} className="item-list">
              
              <div >
                  <Link key={item.cid} to={`clientindividual/${item.id}`} className="link-class">
                  <div className="title">{item.company_name}</div>
                  </Link>
                
              </div>
              
          </div>
        )
      })
    }
  }    
  

  render() {
    return (
      <div className="App">
        <div className="top">
        <h3>&nbsp; &nbsp;Clients        </h3>
        <Link to="/clientsform">&nbsp;&nbsp;&nbsp;<img src={add} width="30px" height="30px"/></Link>
        </div>
        <div className="messages_container">
            {this.renderList(this.state)}
        </div>
      </div>
    );
  }
}

export default App;
