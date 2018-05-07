import React,{Component} from 'react';
import {connect} from 'react-redux';
import {driverDetails} from '../../actions';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import delete1 from '../../assets/img/delete.png';
import edit from '../../assets/img/edit.png';
import URL from '../../actions/index';
import { Link } from 'react-router-dom';
class Car extends Component{

    constructor(){
        super()
        this.state={
            driver_data:[]
        }
      }

    componentWillMount(){
        console.log(this.props.match.params.id)
        //axios.get(`${URL}/drivers?id=${this.props.match.params.id}`)
        axios.get(`${URL}/drivers/${this.props.match.params.id}`)
      .then(response=>{
        const driver_data=response.data;
        this.setState({driver_data});
        console.log({driver_data})
      })
        
        
    }

    handleClick = event =>{
        event.preventDefault();
        console.log("delete clicked")   
        axios.delete(`${URL}/drivers/${this.props.match.params.id}`)
          .then(res => {
            console.log(res);
            console.log(res.data);
          });
          
      }

    renderDetail=({driver_data})=>{
        if(driver_data){
            const path=`#/driversedit/${driver_data.id}`
            return(
                <div>
                <div key={driver_data.id} className="item-list">
                    <div className="title">{driver_data.dname}
                        
                    </div>
                    <div className="sender">Joining Date:<span>{new Date(driver_data.joining_date).toLocaleDateString()}</span></div>
                    <div className="sender">Id Proof :<span>{driver_data.id_proof}</span></div>
                    <div className="sender">Address :<span>{driver_data.address}</span></div>
                    <div className="sender">Mobile No :<span>{driver_data.mobile_no}</span></div>
                    <div className="sender">License No :<span>{driver_data.license_no}</span></div>
                </div>
                <Link key={driver_data.did} to={`/driversedit/${driver_data.did}`} className="link-class">
                    <img src={edit} width="30px" height="30px" />
                </Link>
                <Link key={driver_data.did} to={`/driversdisplay`} className="link-class">
                    <img src={delete1} width="30px" height="30px" onClick={this.handleClick}/>
                </Link>
                
                </div>
            )
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