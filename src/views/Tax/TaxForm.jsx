import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm} from 'redux-form';
import { connect } from  'react-redux';
import { addTax } from '../../actions/index'

import axios from 'axios';
import {DropdownList} from 'react-widgets';
import URL from '../../actions/index'
import { Card } from "../../components/Card/Card.jsx";
import Button from "../../components/CustomButton/CustomButton.jsx";

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
        fleet: []
    };

    

    componentDidMount(){
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
      
      
        this.props.addTax(values,()=>{
          this.props.history.push('/')
        })
    }

    
    render(){
        return(
            <Card
              title="Tax"
              content={
                <div className="Form" >
                <div className="top">
                    <Link to="/clientsdisplay">Display</Link>
                </div>
                
                    <div className="content" id="left">
                        <form onSubmit={this.props.handleSubmit((event)=>this.onSubmit(event))}>
                        <Field
                            myLabel="Tax ID"
                            name="tid"
                            component={this.renderInputField}
                        />
                        
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
                            myLabel= "Due Amount"
                            name="dur_amt"
                            component={this.renderInputFloatField}
                        />
                        
                        <Field
                            myLabel="Due Date"
                            name="Due_date"
                            component={this.renderInputDateField}
                        />
                        <Field
                            myLabel="Previous Date"
                            name="pre_date"
                            component={this.renderInputDateField}
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
    connect(mapStateToProps,{addTax})(Form2)
  )