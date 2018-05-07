import React,{Component} from 'react';
import {connect} from 'react-redux';
import {driverDetails} from '../../actions';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import delete1 from '../../assets/img/delete.png';
import edit from '../../assets/img/edit.png';
import URL from '../../actions/index';
import {Link} from 'react-router-dom';
class Car extends Component{

    constructor(){
        super()
        this.state={
            order_data:[]
        }
      }

    componentWillMount(){
        console.log(this.props.match.params.id)
        axios.get(`${URL}/orders/${this.props.match.params.id}`)
      .then(response=>{
        const order_data=response.data;
        this.setState({order_data});
        console.log({order_data})
      })
        
        
    }

    renderDetail=({order_data})=>{
        if(order_data){
            return(
                <div>
                <div key={order_data.id} className="item-list">
                    <div className="title">{order_data.oid}</div>
                    <div className="sender">Address :<span>{order_data.client_plant_address}</span></div>
                    <div className="sender">Distance :<span>{order_data.distance}</span></div>
                    <div className="sender">Order Created On :<span>{new Date(order_data.order_date).toLocaleDateString()}</span></div>
                    <div className="sender">Client :<span>{order_data.cid}</span></div>
                    
                </div>
                <Link key={order_data.cid} to={`/ordersedit/${order_data.cid}`} className="link-class">
                    <img src={edit} width="30px" height="30px" />
                </Link>
                <Link key={order_data.cid} to={`/ordersdisplay`} className="link-class">
                    <img src={delete1} width="30px" height="30px" onClick={this.handleClick}/>
                </Link>
                </div>
            )
        }
    }

    handleClick = event =>{
        event.preventDefault();
        console.log("delete clicked")   
        axios.delete(`${URL}/orders/${this.props.match.params.id}`)
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