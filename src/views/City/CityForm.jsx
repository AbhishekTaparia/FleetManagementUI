import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm} from 'redux-form';
import { connect } from  'react-redux';
import { addCity } from '../../actions/index'
import Popup from 'react-popup'
import { Card } from "../../components/Card/Card.jsx";
import Button from "../../components/CustomButton/CustomButton.jsx";




class Form2 extends Component{

    state = {
        client: []
    };

    

    componentDidMount(){
        axios
      .get(`${URL}/states`)
      .then(response => {

        // create an array of contacts only with relevant data
        const newContacts = response.data.map(c => {
          return {
            company_name: c.state_name,
            id: c.state_id
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
      
      
        this.props.addCity(values,()=>{
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
                            myLabel="City ID"
                            name="city_id"
                            component={this.renderInputField}
                        />
                        <Field
                            myLabel="City Name"
                            name="city_name"
                            component={this.renderInputField}
                        />
                        <div>
                          <label>State :</label>
                          <Field 
                          myLabel="State"
                          name="state_id"
                          component={DropdownListField}
                          data={this.state.client}
                         // onChange={this.props.handleChange((event)=>this.onChange(event))}
                         //onChange={(evt)=>{console.log("Changed Value:",evt.target.value);}}
                          valueField="id"
                          textField="company_name"
                        />
                        </div>
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
    connect(mapStateToProps,{addCity})(Form2)
  )