import React, { Component } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import Checkbox from "../../components/CustomCheckbox/CustomCheckbox.jsx";
import Button from "../../components/CustomButton/CustomButton.jsx";
import axios from 'axios';
import URL from '../../actions/index'
export class Tasks extends Component {
  constructor(){
    super();
    this.state={
      task_data:[]
    }
  }

  componentDidMount(){
    axios.get(`${URL}/tasks`)
      .then(response=>{
        const task_data=response.data;
        this.setState({task_data});
      })
    
  }

  handleCheckbox = event => {
    const target = event.target;
    console.log(event.target);
    this.setState({
      [target.name]: target.checked
    });
  };

  renderList = ({task_data}) => {
    if(task_data){
      var n=""
      task_data.map((item)=>{
        n= item.task_name
      })

    }
  }


  render() {
    const edit = <Tooltip id="edit_tooltip">Edit Task</Tooltip>;
    const remove = <Tooltip id="remove_tooltip">Remove</Tooltip>;
    const tasks_title = [
      'Sign contract for "What are conference organizers afraid of?"',
      "Lines From Great Russian Literature? Or E-mails From My Boss?",
      "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroi",
      "Create 4 Invisible User Experiences you Never Knew About",
      'Read "Following makes Medium better"',
      "Unfollow 5 enemies from twitter"
    ];
    var tasks = [];
    var number="";
    var textColor="";
    for (var i = 0; i < this.state.task_data.length; i++) {
      
      if(this.state.task_data[i].taskPriority===1){
        textColor="text-danger"
      }
      else if(this.state.task_data[i].taskPriority===2){
        textColor="text-warning"
      }
      else if(this.state.task_data[i].taskPriority===3){
        textColor="text-success"
      }
      else{
        textColor="text-error"
      }
      console.log(textColor)
      console.log(i)
      number = "checkbox" + i;
      tasks.push(
        <tr key={i}className={textColor}>
          <td>
            <Checkbox
              number={number}
              isChecked={this.state.task_data[i].taskStatus === 1 ? true : false}
              
            />
          </td>
          
          <td className={textColor}>{this.state.task_data[i].taskId+" : "+this.state.task_data[i].taskData}</td>
        
          
          <td className="td-actions text-right">
          <OverlayTrigger placement="top" overlay={edit}>
              <Button bsStyle="info" simple type="button" bsSize="xs">
                <i className="fa fa-edit" />
              </Button>
            </OverlayTrigger>

            <OverlayTrigger placement="top" overlay={remove}>
              <Button bsStyle="danger" simple type="button" bsSize="xs">
                <i className="fa fa-times" />
              </Button>
            </OverlayTrigger>
          </td>
        </tr>
      );
    }
    return <tbody>{tasks}</tbody>;
  }
}

export default Tasks;
