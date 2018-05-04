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
            driver_data:[]
        }
      }

    componentWillMount(){
        console.log(this.props.match.params.id)
        axios.get(`${URL}/drivers?id=${this.props.match.params.id}`)
      .then(response=>{
        const driver_data=response.data;
        this.setState({driver_data});
        console.log({driver_data})
      })
        
        
    }

    renderDetail=({driver_data})=>{
        if(driver_data){
            return driver_data.map((item)=>{
                return(
                    <div>
                    <div key={item.id} className="item-list">
                        <div className="title">{item.driver_name}
                            
                        </div>
                        <div className="sender">Joining Date:<span>{item.joining_date}</span></div>
                        <div className="sender">{item.id_proof}</div>
                        <div className="sender">{item.address}</div>
                        <div className="sender">{item.mobile_no}</div>
                        <div className="sender">{item.licence_no}</div>
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