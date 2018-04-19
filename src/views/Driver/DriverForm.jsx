import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm} from 'redux-form';
import { connect } from  'react-redux';
import { addDriver } from '../../actions/index';


class Form2 extends Component{

    
    renderInputField(field){

        const className = `form-input ${field.meta.touched && field.meta.error ? 'has-error':''}`
    
        return(
          <div className={className}>
            <label>{field.myLabel}</label>
            <input 
            type="text"
            {...field.input}
            value="qwee"
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

      renderInputImageField(field){
        const className = `form-input ${field.meta.touched && field.meta.error ? 'has-error':''}`
    
        return(
          <div className={className}>
            <label>{field.myLabel}</label>
            <input 
            type="file"
            
//            onChange={this.fileChangedHandler}
            />
            <button onClick={this.uploadHandler}>Upload</button>
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
            {...field.input}
            value="789456123"
            className="form-control"
            />
            <div className="error">
              {field.meta.touched ? field.meta.error:''}
            </div>
          </div>
        )
      }

    onSubmit(values){
        this.props.addDriver(values,()=>{
          this.props.history.push('/')
        })
    }

    
    render(){
        return(
            
                <div className="Form" >
                    <div className="top">
                        <h3>Add a Client</h3>
                        <Link to="/driverdisplay">Back</Link>
                    </div>
            
                        <div className="content" id="left">
                            <form onSubmit={this.props.handleSubmit((event)=>this.onSubmit(event))}>
                            <Field
                                myLabel="Driver Name"
                                name="driver_name"
                                component={this.renderInputField}
                            />
                            <Field
                                myLabel="Joining Date"
                                name="joining_date"
                                component={this.renderInputDateField}
                            />
                            <Field
                                myLabel="Adhaar Card No"
                                name="id_proof"
                                component={this.renderInputFloatField}
                            />
                            <Field
                                myLabel="Address"
                                name="address"
                                component={this.renderInputField}
                            />
                            <Field
                                myLabel="Mobile no"
                                name="mobile_no"
                                component={this.renderInputFloatField}
                            />
                            <Field
                                myLabel="Driving License No"
                                name="licence_no"
                                component={this.renderInputFloatField}
                            />
                            {/* <Field
                                myLabel="Photo"
                                name="photo"
                                component={this.renderInputImageField}
                            /> */}
                            
                            <button type="submit">Submit</button>
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
    form:'PostDriver'
  })(
    connect(mapStateToProps,{addDriver})(Form2)
  )