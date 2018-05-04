import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import add from '../../assets/img/add.png';
import URL from '../../actions/index';

class App extends Component {

  constructor(){
    super()
    this.state={
        task_data:[],
        client_data:[],
        status:""
    }
  }

  componentDidMount(){
    axios.get(`${URL}/task`)
      .then(response=>{
        const task_data=response.data;
        this.setState({task_data});
      })
      axios.get(`${URL}/client`)
      .then(response=>{
        const client_data=response.data;
        this.setState({client_data});
      })
  }


  renderList = ({task_data}) => {
    if(task_data){
      return task_data.map((item)=>{
          if(item)
          {this.state.status=item.task_status === 1 ? "Done" : "Not Done"}
        return(
          
          <div key={item.id} className="item-list">
              {/* {console.log(item)}
              <div >
                  <Link key={item.id} to={`orderindividual/${item.id}`} className="link-class">
                  <div className="title">{"O0"+item.id}</div>
                  </Link>
                
              </div> */}
               <div className="title">{item.task_name}</div>
              <div className="sender">Task Description : <span>{item.task_data}</span></div>
              <div className="sender">Task Added On :<span>{item.task_added}</span></div>
              
              <div className="sender">Status :<span>{this.state.status}</span></div> 
          </div>
        )
      })
    }
  }


  render() {
    return (
      <div className="App">
        <div className="top">
        <h3>&nbsp; &nbsp;Tasks        </h3>
        <Link to="/taskform">&nbsp;&nbsp;&nbsp;<img src={add} width="30px" height="30px"/></Link>
        </div>
        <div className="messages_container">
          {this.renderList(this.state)}
        </div>
      </div>
    );
  }
}


export default App;