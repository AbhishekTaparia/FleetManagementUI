import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import add from '../../assets/img/add.png';
import URL from '../../actions/index';

class App extends Component {

  constructor(){
    super()
    this.state={
        note_data:[],
        client_data:[]
    }
  }

  componentDidMount(){
    axios.get(`${URL}/notes`)
      .then(response=>{
        const note_data=response.data;
        this.setState({note_data});
      })
      
  }


  renderList = ({note_data}) => {
    if(note_data){
      return note_data.map((item)=>{
          if(item)
        return(
          
          <div key={item.id} className="item-list">
              {console.log(item)}
              <div >
                  <Link key={item.notesId} to={`noteindividual/${item.notesId}`} className="link-class">
                  <div className="title">{item.notesName+"("+item.notesId+")"}</div>
                  <div className="sender">Note Description :<span>{item.noteData}</span></div>
                  <div className="sender">Added On :<span>{new Date(item.noteAdded).toLocaleDateString()}</span></div>
                  <div className="sender">Edited On :<span>{new Date(item.lastEdited).toLocaleDateString()}</span></div>
                  
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
        <h3>&nbsp; &nbsp;Notes        </h3>
        <Link to="/noteadd">&nbsp;&nbsp;&nbsp;<img src={add} width="30px" height="30px"/></Link>
        </div>
        <div className="messages_container">
          {this.renderList(this.state)}
        </div>
      </div>
    );
  }
}


export default App;