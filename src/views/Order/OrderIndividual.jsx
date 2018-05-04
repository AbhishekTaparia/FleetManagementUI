import React,{Component} from 'react';
import {connect} from 'react-redux';
import {driverDetails} from '../../actions';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import delete1 from '../../assets/img/delete.png';
import edit from '../../assets/img/edit.png';
import URL from '../../actions/index';
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
            return order_data.map((item)=>{
                return(
                    <div>
                    <div key={item.id} className="item-list">
                        <div className="title">{item.id}</div>
                        
                        <div className="sender">{item.address}</div>
                        
                        <div className="sender">Distance:<span>{item.distance}</span></div>
                        
                        <div className="sender">{item.order_date}</div>
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