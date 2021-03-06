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



const DropdownListField = (props) => {
  function handleChange(option) {
  let value = option

  const {valueField} = props

  if (valueField) {
    value = option[valueField]
  }

  props.input.onChange(value)
  console.log(option)
}
 
       return (
       <DropdownList {...props} value={props.input.value} onChange={handleChange}  />
       )
}

class Form2 extends Component{

    state = {
        deliver: []
    };

    

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

    renderInputField(field){

        const className = `form-input ${field.meta.touched && field.meta.error ? 'has-error':''}`
    
        return(
          <div className={className}>
            <label>{field.myLabel}</label>
            <input 
            type="text"
            {...field.input}
            className="form-control"
            />
            <div className="error">
              {field.meta.touched ? field.meta.error:''}
            </div>
          </div>
        )
      }
    
      renderInputDateField(field){
        const className = `form-input ${field.meta.touched && field.meta.error ? 'has-error':''}`
    
        return(
          <div className={className}>
            <label>{field.myLabel}</label>
            <input 
            type="date"
            className="form-control"
            {...field.input}
            defaultValue={new Date().getDate().toLocaleString()}
            />
            <div className="error">
              {field.meta.touched ? field.meta.error:''}
            </div>
          </div>
        )
      }

      renderInputFloatField(field){
        const className = `form-input ${field.meta.touched && field.meta.error ? 'has-error':''}`
    
        return(
          <div className={className}>
            <label>{field.myLabel}</label>
            <input 
            type="number"
            className="form-control"
            {...field.input}
            />
            <div className="error">
              {field.meta.touched ? field.meta.error:''}
            </div>
          </div>
        )
      }

    onSubmit(values){
      console.log("Submit")
      console.log(values)
        this.props.addTripExp(values,()=>{
          this.props.history.push('/')
        })
    }

    // displayDropDownList(){
    //     let optionItems = options.map((item) =>
    //             <option key={item.value}>{item.label}</option>
    //         );

    //     return (
    //      <div>
    //          <select required name="client_name" onChange={val => console.log(val)}>
    //             {optionItems}
    //          </select>
    //      </div>
    //     )
    // }
    
    

    render(){
      const colors=[{ color: 'Red', value:'ff0000'},{ color: 'Blue', value:'0000ff'}]
      console.log()
        return(
            <Card
              title="Trip Expense"
              content={
                <div className="Form" >
                <div className="top">
                    <h3>Add a Trip Expense</h3>
                    <Link to="/tripexpdisplay">Back</Link>
                </div>
        
                    <div className="form-child" id="left">
                        <form onSubmit={this.props.handleSubmit((event)=>this.onSubmit(event))}>
                        <Field
                            myLabel="Trip Id"
                            name="tripId"
                            component={this.renderInputField}
                        />
                        <Field
                            myLabel="Driver Expense"
                            name="driverExp"
                            component={this.renderInputFloatField}
                        />
                        <Field
                            myLabel="Trip Expense"
                            name="tripExp"
                            component={this.renderInputFloatField}
                        />
                        <Field
                            myLabel="Misc Expense"
                            name="miscExp"
                            component={this.renderInputFloatField}
                        />
                        
                        <Field
                            myLabel="Repair Expense"
                            name="repairExp"
                            component={this.renderInputFloatField}
                        />
                        <Field
                            myLabel="Toll Expense"
                            name="tollExp"
                            component={this.renderInputFloatField}
                        />
                        <Field
                            myLabel="Diesel Expense"
                            name="dieselExp"
                            component={this.renderInputFloatField}
                        />
                        <Field
                            myLabel="Daily Allowance"
                            name="dailyAllowanceExp"
                            component={this.renderInputFloatField}
                        />
                        <Field
                            myLabel="Border Charges"
                            name="borderCharges"
                            component={this.renderInputFloatField}
                        />
                        <Field
                            myLabel="Cash Expense"
                            name="cashExp"
                            component={this.renderInputFloatField}
                        />
                        <div>
                          <label>Delivery :</label>
                          <Field 
                          myLabel="Deliver ID"
                          name="delivery_id"
                          component={DropdownListField}
                          data={this.state.client}
                         // onChange={this.props.handleChange((event)=>this.onChange(event))}
                         //onChange={(evt)=>{console.log("Changed Value:",evt.target.value);}}
                          valueField="id"
                          textField="company_name"
                        />
                        </div>
                        <div><label></label></div>
                        {/* <Field name="sex" value="Stanford University" component={this.displayDropDownList} >
                          
                          
                        </Field> */}
                        {/* <Select
                          name="client"
                          value="company_name"
                          options={this.state.client}
                          textField="company_name"
                          onChange={val => console.log(val)}
                        />     */}
                        <Button bsStyle="info" pullRight fill type="submit">
                          Submit
                        </Button>
                        </form>
                        
                    </div>
                    
                </div>
        
              }
            />
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