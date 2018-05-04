import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm} from 'redux-form';
import { connect } from  'react-redux';
import { addDeliver } from '../../actions/index'
import {DropdownList} from 'react-widgets';
import { Card } from "../../components/Card/Card.jsx";
import Button from "../../components/CustomButton/CustomButton.jsx";
import axios from 'axios';
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
        order: [],
        driver:[],
        fleet:[]
    };

    

    componentDidMount(){
        axios
            .get(`${URL}/orders`)
            .then(response => {
                // create an array of contacts only with relevant data
                const newContacts = response.data.map(c => {
                return {
                    //company_name: c.company_name,
                    id: c.id
                };
                });

                // create a new "State" object without mutating 
                // the original State object. 
                const newState = Object.assign({}, this.state, {
                order: newContacts
                });

                // store the new state object in the component's state
                this.setState(newState);
                console.log(this.state)
            })
            .catch(error => console.log(error));

        axios
            .get(`${URL}/drivers`)
            .then(response => {
                // create an array of contacts only with relevant data
                const newContacts = response.data.map(c => {
                return {
                    driver_name: c.driver_name,
                    id: c.id
                };
                });

                // create a new "State" object without mutating 
                // the original State object. 
                const newState = Object.assign({}, this.state, {
                driver: newContacts
                });

                // store the new state object in the component's state
                this.setState(newState);
                console.log(this.state)
            })
            .catch(error => console.log(error));
        
            axios
            .get(`${URL}/fleets`)
            .then(response => {
                // create an array of contacts only with relevant data
                const newContacts = response.data.map(c => {
                return {
                    company_name: c.company_name,
                    id: c.id,
                    model_no: c.model_no
                };
                });

                // create a new "State" object without mutating 
                // the original State object. 
                const newState = Object.assign({}, this.state, {
                fleet: newContacts
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
    


      
    onSubmit(values){
      
      
        this.props.addDeliver(values,()=>{
          this.props.history.push('/')
        })
    }

    
    render(){
        return(
            <Card
              title="Delivery"
              content={
                <div className="Form" >
                <div className="top">
                    <Link to="/deliversdisplay">Display</Link>
                </div>
                
                    <div className="content" id="left">
                        <form onSubmit={this.props.handleSubmit((event)=>this.onSubmit(event))}>
                        <Field
                            myLabel="Delivery ID"
                            name="deid"
                            component={this.renderInputField}
                        />
                        <div>
                              <label>Clients :</label>
                              <Field 
                              myLabel="Order ID"
                              name="oid"
                              component={DropdownListField}
                              data={this.state.order}
                             // onChange={this.props.handleChange((event)=>this.onChange(event))}
                             //onChange={(evt)=>{console.log("Changed Value:",evt.target.value);}}
                              valueField="id"
                              textField="id"
                            />
                        </div>
                        <div><label></label></div>
                        <div>
                              <label>Driver :</label>
                              <Field 
                              myLabel="Driver ID"
                              name="did"
                              component={DropdownListField}
                              data={this.state.driver}
                             // onChange={this.props.handleChange((event)=>this.onChange(event))}
                             //onChange={(evt)=>{console.log("Changed Value:",evt.target.value);}}
                              valueField="id"
                              textField="driver_name"
                            />
                        </div>
                        <div><label></label></div>
                        <div>
                              <label>Fleet :</label>
                              <Field 
                              myLabel="Fleet ID"
                              name="fid"
                              component={DropdownListField}
                              data={this.state.fleet}
                              valueField="id"
                              textField="model_no"
                            />
                        </div>
                        <div><label></label></div>
                        <Field
                            myLabel="Status"
                            name="status"
                            component={this.renderInputField}
                        />
                        <Field
                            myLabel="Start Date"
                            name="start_date"
                            component={this.renderInputField}
                        />
                        <Field
                            myLabel="End Date"
                            name="end_date"
                            component={this.renderInputField}
                        />
                        
                        <div><label></label></div>
                        {/* <button type="submit" bsStyle="info">Submit</button> */}
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

    if(!values.cid){
      errors.cid = "Enter Company ID"
    }

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
      success:state.data
    }
  }
  
  export default reduxForm({
    validate,
    form:'PostClient'
  })(
    connect(mapStateToProps,{addDeliver})(Form2)
  )