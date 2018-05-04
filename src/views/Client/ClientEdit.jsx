import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm} from 'redux-form';
import { connect } from  'react-redux';
import { updateClient } from '../../actions/index'
import axios from 'axios';
import { Card } from "../../components/Card/Card.jsx";
import Button from "../../components/CustomButton/CustomButton.jsx";
import URL from "../../actions/index"



class Form2 extends Component{
constructor(){
    super()
    this.state={
        client_data2:''
    }
    //console.log(this.props.match.params.id)
}
componentWillMount(){
    console.log(this.props.match.params.id)
    axios.get(`${URL}/clients/${this.props.match.params.id}`)
  .then(response=>{
    const client_data2=response.data;
    console.log(client_data2)
    this.setState({client_data2});
    console.log({client_data2})
  })
    
    
}
    renderInputField(field){
        console.log(field.defaultv)
        const className = `form-input ${field.meta.touched && field.meta.error ? 'has-error':''}`
        return(
          <div className={className}>
            <label>{field.myLabel}</label>
            <input 
            type="text"
            value="dsfs"
            className="form-control"
            {...field.input}
            />
            <div className="error">
              {field.meta.touched ? field.meta.error:''}
            </div>
          </div>
        )
      }
    


      
    onSubmit(cid,values){
      
      
        this.props.updateClient(this.state.client_data2.cid,values)
    }

    
    render(){
        console.log(this.state.client_data2.company_name)
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
                            defaultv={this.state.client_data2.cid}
                        />
                        <Field
                            myLabel="Company Name"
                            name="company_name"
                            component={this.renderInputField}
                            defaultv={this.state.client_data2.company_name}
                            
                        />
                        <Field
                            myLabel="Contact"
                            name="contact"
                            component={this.renderInputField}
                            defaultv={this.state.client_data2.contact}
                        />
                        <Field
                            myLabel="Address"
                            name="address"
                            component={this.renderInputField}
                            defaultv={this.state.client_data2.address}
                        />
                        <Field
                            myLabel="Owner Name"
                            name="owner_name"
                            component={this.renderInputField}
                            defaultv={this.state.client_data2.owner_name}
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
    connect(mapStateToProps,{updateClient})(Form2)
  )