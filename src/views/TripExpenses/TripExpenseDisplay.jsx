import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm} from 'redux-form';
import { connect } from  'react-redux';
import { addTripExp } from '../../actions/index';
import { getClient } from '../../actions/index';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import {DropdownList} from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css'
import { Card } from '../../components/Card/Card';
//import Select from 'react-select';
//import 'react-select/dist/react-select.css';
//import { Card } from "../../components/Card/Card.jsx";
import Button from "../../components/CustomButton/CustomButton.jsx";
import URL from '../../actions/index'
import TableDemo from '../../views/Report/ReportTable';

var val;
var tripExpData=[
  {id: '1', name: 'qwert', value: '2'},
  {id: 2, name: 'Buster', value: '5'},
  {id: 3, name: 'George Michael', value: '4'}];
const DropdownListField = (props) => {
  function handleChange(option) {
  let value = option
    
  const {valueField} = props
    console.log(valueField)
  if (valueField) {
    value = option[valueField]
  }
    console.log(value)
    val=value
    console.log(val)
    Form2.getTripData(val)
  props.input.onChange(value)
  console.log(option)
}
 
       return (
       <DropdownList {...props} value={props.input.value} onChange={handleChange}  />
       )
}
// getTripData(val){
  //         const tripExp=response.data;
//     axios.get(`${URL}/tripexp/${val}`)
//         .then(response=>{
//         this.setState({tripExp});
//         console.log(response.data)
//     })
// }
class Form2 extends Component{


    constructor(){
      super()
      this.state={
        tripExp: [] 
      }
    }

    componentDidMount(){
        axios
      .get(`${URL}/deliveries`)
      .then(response => {

        // create an array of contacts only with relevant data
        const newContacts = response.data.map(c => {
          return {
            
            company_name: c.deliveryId,
            id: c.deliveryId
          };
        });

        // create a new "State" object without mutating 
        // the original State object. 
        const newState = Object.assign({}, this.state, {
          client: newContacts
        });

        // store the new state object in the component's state
        this.setState(newState);
        console.log(this.state)
      })
      .catch(error => console.log(error));
      
      
      
    }
    
    static  getTripData(val){
        axios.get(`${URL}/tripexpense/reports/${val}`)
        .then(response=>{
        const tripExp=response.data;
        //this.setState({tripExp});
        setTimeout(()=>{},1000)
          tripExpData=tripExp
          console.log(tripExpData)
        console.log(val)
        console.log(response.data)
    })
    }
    
    render(){
      var qwert=tripExpData;
      console.log(qwert)
      const colors=[{ color: 'Red', value:'ff0000'},{ color: 'Blue', value:'0000ff'}]
      console.log()
        return(
            <div>
              <label>Delivery :</label>
              <Field 
              myLabel="Deliver ID"
              name="deliver_id"
              component={DropdownListField}
              data={this.state.client}
              //onChange={this.props.handleChange((event)=>this.onChange(event))}
              //onChange={(evt)=>{console.log("Changed Value:",evt.target.value);}}
              
              valueField="id"
              textField="company_name"
            />
                  
            <Link key={val} to={`tripexpenseshow/${val}`} className="link-class">
              {/* <button> Show </button> */}
              <div className="title">{"Show"}</div> 
            </Link>
                               

                        </div>
        )
    }
}

function validate(values){
    console.log("validate")
    const errors = {}
  
    if(!values.company_name){
      errors.company_name = "Enter Company name"
    }
  
    if(!values.contact){
      errors.contact = "Enter you name"
    }
  
    if(!values.address){
      errors.address = "Enter a address"
    }
  
    if(!values.owner_name){
        errors.owner_name = "Enter owner's name"
    }

    return errors;
  }

function mapStateToProps(state){
    console.log(state)
    return {
      success:state.data,
      
    }
  }
  
function mapDispatchToProps(dispatch){
    return bindActionCreators({addTripExp} , dispatch);
}

export default reduxForm({
    validate,
    form:'PostOrder'
  })(
    connect(mapStateToProps,{addTripExp})(Form2)

  )