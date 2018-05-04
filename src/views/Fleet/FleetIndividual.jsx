import React,{Component} from 'react';
import {connect} from 'react-redux';
import {driverDetails} from '../../actions';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import delete1 from '../../assets/img/delete.png';
import edit from '../../assets/img/edit.png';
import URL from '../../actions/index'
class Car extends Component{

    constructor(){
        super()
        this.state={
            fleet_data:[]
        }
      }

    componentWillMount(){
        console.log(this.props.match.params.id)
        axios.get(`${URL}/fleets?id=${this.props.match.params.id}`)
      .then(response=>{
        const fleet_data=response.data;
        this.setState({fleet_data});
        console.log({fleet_data})
      })
        
        
    }

    renderDetail=({fleet_data})=>{
        if(fleet_data){
            return fleet_data.map((item)=>{
                return(
                    <div>
                    <div key={item.id} className="item-list">
                        <div className="title">{item.comapny}</div>
                        <div className="sender">Wheels:<span>{item.wheels}</span></div>
                        <div className="sender">{item.model_no}</div>
                        <div className="sender">{item.fleetPrice}</div>
                        <div className="sender">{new Date(item.dateOfPurchase).toLocaleDateString()}</div>
                    </div>
                    <div><img src={edit} width="30px" height="30px"/>&nbsp;<img src={delete1} width="30px" height="30px"/></div>
                    
                    </div>
                )
            })
        }
    }

    render(){
        return(
            <div className="messages_container">
                {this.renderDetail(this.state)}
            </div>
        );
    }

    
}

export default Car;