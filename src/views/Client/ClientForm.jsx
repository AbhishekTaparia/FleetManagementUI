import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm} from 'redux-form';
import { connect } from  'react-redux';
import { addClient } from '../../actions/index'
import Popup from 'react-popup'
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
      
      
        this.props.addClient(values,()=>{
          this.props.history.push('/')
        })
        Popup.alert('qewretr');
        
    }

    
    render(){
        return(
            <Card
              title="Client"
              content={
                <div className="Form" >
                <div className="top">
                    <Link to="/clientsdisplay">Display</Link>
                </div>
                
                    <div className="content" id="left">
                        <form onSubmit={this.props.handleSubmit((event)=>this.onSubmit(event))}>
                        <Field
                            myLabel="Client ID"
                            name="cid"
                            component={this.renderInputField}
                        />
                        <Field
                            myLabel="Company Name"
                            name="company_name"
                            component={this.renderInputField}
                        />
                        <Field
                            myLabel="Contact"
                            name="contact"
                            component={this.renderInputFloatField}
                        />
                        <Field
                            myLabel="Address"
                            name="address"
                            component={this.renderInputField}
                        />
                        <Field
                            myLabel="Owner Name"
                            name="owner_name"
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
      errors.contact = "Enter Contact"
    }
  
    if(!values.address){
      errors.address = "Enter a address"
    }

    if(Number(values.contact)>1000000000 && Number(values.contact) <10000000000){
      errors.contact = "Enter correct contact"
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
    connect(mapStateToProps,{addClient})(Form2)
  )