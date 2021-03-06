import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm} from 'redux-form';
import { connect } from  'react-redux';
import { addNote } from '../../actions/index';
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
        client: [],
        priority:[
            {
                key:"Max",
                value:2
            },
            {
                key:"Netural",
                value:1
            },
            {
                key:"Min",
                value:0
            },
        ]
    };

    

    componentDidMount(){
        axios
      .get(`${URL}/clients`)
      .then(response => {

        // create an array of contacts only with relevant data
        const newContacts = response.data.map(c => {
          return {
            company_name: c.company_name,
            id: c.id
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
      renderInputDescField(field){
        const className = `form-input ${field.meta.touched && field.meta.error ? 'has-error':''}`
    
        return(
          <div className={className}>
            <label>{field.myLabel}</label>
            <textarea
            type="textarea"
            rows="5"
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
        this.props.addNote(values,()=>{
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
              title="Notes"
              content={
                <div className="Form" >
                <div className="top">
                    <h3>Add a Note</h3>
                    <Link to="/notedisplay">Display</Link>
                </div>
        
                    <div className="form-child" id="left">
                        <form onSubmit={this.props.handleSubmit((event)=>this.onSubmit(event))}>
                        <Field
                            myLabel="Note ID"
                            name="notesId"
                            component={this.renderInputField}
                        />
                        <Field
                            myLabel="Note Title"
                            name="notesName"
                            v
                            component={this.renderInputField}
                        />
                        <Field
                            myLabel="Note Description"
                            name="noteData"
                            component={this.renderInputField}
                            
                        />
                        <Field
                            myLabel="Note Date"
                            name="noteAdded"
                            component={this.renderInputDateField}
                            defaultValue={new Date()}
                        />
                        <Field
                            myLabel="Note Last Edited Date"
                            name="lastEdited"
                            component={this.renderInputDateField}
                            
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
    return bindActionCreators({addNote} , dispatch);
}

  export default reduxForm({
    validate,
    form:'PostOrder'
  })(
    connect(mapStateToProps,{addNote})(Form2)

  )