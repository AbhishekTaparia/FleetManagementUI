import React,{Component} from 'react';
import {connect} from 'react-redux';
import {driverDetails} from '../../actions';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import delete1 from '../../assets/img/delete.png';
import edit from '../../assets/img/edit.png';
import URL from '../../actions/index'
import { Link } from 'react-router-dom';
class Car extends Component{

    constructor(){
        super()
        this.state={
            fleet_data:[]
        }
      }

    componentWillMount(){
        console.log(this.props.match.params.id)
        //axios.get(`${URL}/fleets?id=${this.props.match.params.id}`)
        axios.get(`${URL}/fleets/${this.props.match.params.id}`)
      .then(response=>{
        const fleet_data=response.data;
        this.setState({fleet_data});
        console.log({fleet_data})
      })
        
        
    }

    renderDetail=({fleet_data})=>{
        if(fleet_data){
            const path=`#/fleetsedit/${fleet_data.cid}`
            return(
                <div>
                <div key={fleet_data.fid} className="item-list">
                    <div className="title">{fleet_data.comapny}</div>
                    <div className="sender">Wheels :<span>{fleet_data.wheels}</span></div>
                    <div className="sender">Model No :<span>{fleet_data.modelNo}</span></div>
                    <div className="sender">Registration No :<span>{fleet_data.registrationNo}</span></div>
                    <div className="sender">Fleet Price :<span>{"₹"+fleet_data.fleetPrice}</span></div>
                    <div className="sender">Date of Purchase :<span>{new Date(fleet_data.dateOfPurchase).toLocaleDateString()}</span></div>
                </div>
                <Link key={fleet_data.fid} to={`/driversedit/${fleet_data.fid}`} className="link-class">
                    <img src={edit} width="30px" height="30px" />
                </Link>
                <Link key={fleet_data.fid} to={`/driversdisplay`} className="link-class">
                    <img src={delete1} width="30px" height="30px" onClick={this.handleClick}/>
                </Link>
                
                </div>
            )
        }
    }

    handleClick = event =>{
        event.preventDefault();
        console.log("delete clicked")   
        axios.delete(`${URL}/fleets/${this.props.match.params.id}`)
          .then(res => {
            console.log(res);
            console.log(res.data);
          });
          
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