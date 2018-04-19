import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm} from 'redux-form';
import { connect } from  'react-redux';
import { addClient } from '../../actions/index'

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
    

    onSubmit(values){
        this.props.addClient(values,()=>{
          this.props.history.push('/')
        })
    }

    
    render(){
        return(
            
                <div className="Form" >
                    <div className="top">
                        <h3>Add a Client</h3>
                        <Link to="/clientsdisplay">Back</Link>
                    </div>
                    
                        <div className="content" id="left">
                            <form onSubmit={this.props.handleSubmit((event)=>this.onSubmit(event))}>
                            <Field
                                myLabel="Company Name"
                                name="company_name"
                                component={this.renderInputField}
                            />
                            <Field
                                myLabel="Contact"
                                name="contact"
                                component={this.renderInputField}
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
                            <button type="submit" bsStyle="info">Submit</button>
                            </form>
                            
                        </div>
                        
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
      success:state.data
    }
  }
  
  export default reduxForm({
    validate,
    form:'PostClient'
  })(
    connect(mapStateToProps,{addClient})(Form2)
  )