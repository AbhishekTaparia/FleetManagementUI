import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm} from 'redux-form';
import { connect } from  'react-redux';
import { addFleet } from '../../actions/index'

import { Card } from "../../components/Card/Card.jsx";
import Button from "../../components/CustomButton/CustomButton.jsx";

class Form2 extends Component{

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
            {...field.input}
            className="form-control"
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
        this.props.addFleet(values,()=>{
          this.props.history.push('/')
        })
    }

    
    render(){
        return(
            <Card
              title="Fleet"
              content={  <div className="Form" >
                    <div className="top">
                        <h3>Add a Fleet</h3>
                        <Link to="/fleetdisplay">Back</Link>
                    </div>
                    
                        <div className="form-child" id="left">
                            <form onSubmit={this.props.handleSubmit((event)=>this.onSubmit(event))}>
                            <Field
                                myLabel="Fleet ID"
                                name="fleetId"
                                component={this.renderInputField}
                            />
                            <Field
                                myLabel="Company Name"
                                name="comapny"
                                component={this.renderInputField}
                            />
                            <Field
                                myLabel="Wheels"
                                name="wheels"
                                component={this.renderInputFloatField}
                            />
                            <Field
                                myLabel="Registration No"
                                name="registrationNo"
                                component={this.renderInputField}
                            />
                            <Field
                                myLabel="Model No"
                                name="modelNo"
                                component={this.renderInputFloatField}
                            />
                            <Field
                                myLabel="Chasis No"
                                name="chasisNo"
                                component={this.renderInputFloatField}
                            />
                            <Field
                                myLabel="Date of Purchase"
                                name="dateOfPurchase"
                                component={this.renderInputDateField}
                            />
                            <Field
                                myLabel="Price"
                                name="fleetprice"
                                component={this.renderInputFloatField}
                            />
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
      success:state.data
    }
  }
  
  export default reduxForm({
    validate,
    form:'PostFleet'
  })(
    connect(mapStateToProps,{addFleet})(Form2)
  )