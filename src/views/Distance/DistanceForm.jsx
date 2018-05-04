import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm} from 'redux-form';
import { connect } from  'react-redux';
import { addDistance } from '../../actions/index';
import { getClient } from '../../actions/index';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import {DropdownList} from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css'
import { Card } from "../../components/Card/Card.jsx";
import Button from "../../components/CustomButton/CustomButton.jsx";
//import Select from 'react-select';
import URL from '../../actions/index'
//import 'react-select/dist/react-select.css';



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
        city: []
    };

    

    componentDidMount(){
        axios
      .get(`${URL}/cities`)
      .then(response => {

        // create an array of contacts only with relevant data
        const newContacts = response.data.map(c => {
          return {
            company_name: c.city_name,
            id: c.id
          };
        });

        // create a new "State" object without mutating 
        // the original State object. 
        const newState = Object.assign({}, this.state, {
          city: newContacts
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
        this.props.addDistance(values,()=>{
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
              title="Distance"
              content={  <div className="Form" >
                    <div className="top">
                        <h3>Add City Distance</h3>
                        <Link to="/orderdisplay">Back</Link>
                    </div>
            
                        <div className="form-child" id="left">
                            <form onSubmit={this.props.handleSubmit((event)=>this.onSubmit(event))}>
                            <div>
                              <label>City 1 :</label>
                              <Field 
                              myLabel="City 1"
                              name="city1"
                              component={DropdownListField}
                              data={this.state.city}
                             // onChange={this.props.handleChange((event)=>this.onChange(event))}
                             //onChange={(evt)=>{console.log("Changed Value:",evt.target.value);}}
                              valueField="id"
                              textField="company_name"
                            />
                            </div>
                            <div><label></label></div>
                            <div>
                              <label>City 2 :</label>
                              <Field 
                              myLabel="City 2"
                              name="city2"
                              component={DropdownListField}
                              data={this.state.city}
                             // onChange={this.props.handleChange((event)=>this.onChange(event))}
                             //onChange={(evt)=>{console.log("Changed Value:",evt.target.value);}}
                              valueField="id"
                              textField="company_name"
                            />
                            </div>
                            <div><label></label></div>
                            <Field
                                myLabel="Distance"
                                name="distance"
                                component={this.renderInputFloatField}
                            />
                            {/* <Field name="sex" value="Stanford University" component={this.displayDropDownList} >
                              
                              
                            </Field> */}
                            {/* <Select
                              name="client"
                              value="company_name"
                              options={this.state.client}
                              textField="company_name"
                              onChange={val => console.log(val)}
                            />     */}
                            <div><label></label></div>
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
    return bindActionCreators({addDistance} , dispatch);
}

  export default reduxForm({
    validate,
    form:'PostOrder'
  })(
    connect(mapStateToProps,{addDistance})(Form2)

  )