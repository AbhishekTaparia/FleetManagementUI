import React,{Component} from 'react';
import {connect} from 'react-redux';
import {driverDetails} from '../../actions';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import delete1 from '../../assets/img/delete.png';
import edit from '../../assets/img/edit.png';
import ClientEdit from './ClientEdit';
import { Link } from 'react-router-dom';
import URL from '../../actions/index';
import Popup from 'react-popup';
var msg="";
class Car extends Component{

    constructor(){
        super()
        this.state={
            client_data:''
        }
      }

      handleClick = event =>{
        event.preventDefault();
        console.log("delete clicked")   
        axios.delete(`${URL}/clients/${this.props.match.params.id}`)
          .then(res => {
            console.log(res);
            console.log(res.data);
            msg=res.data.msg
          });
          
          
      }
      


    componentWillMount(){
        console.log(this.props.match.params.id)
        //axios.get(`${URL}/clients?cid=${this.props.match.params.id}`)
        axios.get(`${URL}/clients/${this.props.match.params.id}`)
      .then(response=>{
        const client_data=response.data;
        console.log(client_data)
        this.setState({client_data});
        console.log({client_data})
      })
        
        
    }

    renderDetail=({client_data})=>{
        if(client_data){
            // return client_data.map((item)=>{
            //     return(
            //         <div>
            //         <div key={item.id} className="item-list">
            //             <div className="title">{item.company_name}</div>
            //             <div className="sender">Contact:<span>{item.contact}</span></div>
            //             <div className="sender">{item.address}</div>
            //             <div className="sender">{item.owner_name}</div>
            //         </div>
            //         <div>
            //             <img src={edit} width="30px" height="30px"/>&nbsp;
            //             <button onClick={this.handleClick}>
            //                 <img src={delete1} width="30px" height="30px" />
            //             </button>
            //         </div>
            //         </div>
            //     )
            // })
            
            const path=`#/clientsedit/${client_data.cid}`
            return(
                        <div>
                        <div key={client_data.cid} className="item-list">
                            <div className="title"><span>{client_data.company_name}</span></div>
                            {/* <div className="sender">Contact:<span>{client_data.contact}</span></div> */}
                            <div className="sender">Address:<span>{client_data.address}</span></div>
                            <div className="sender">Owner Name:<span>{client_data.owner_name}</span></div>
                        </div>
                        <div>
                        <Link key={client_data.cid} to={`/clientsedit/${client_data.cid}`} className="link-class">
                            <img src={edit} width="30px" height="30px" />
                        </Link>
                        <Link key={client_data.cid} to={`/clientsdisplay`} className="link-class">
                            <img src={delete1} width="30px" height="30px" onClick={this.handleClick}/>
                        </Link>
                        </div>
                        
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