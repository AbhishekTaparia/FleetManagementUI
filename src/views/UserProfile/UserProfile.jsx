import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm} from 'redux-form';
import { connect } from  'react-redux';
import { addOrder } from '../../actions/index';
import { getClient } from '../../actions/index';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import {DropdownList} from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css'
//import Select from 'react-select';
//import 'react-select/dist/react-select.css';
import { Button,FormGroup,ControlLabel,FormControl,HelpBlock,DropdownButton,MenuItem } from 'react-bootstrap';



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
            <DropdownList {...props} value={props.input.value} onChange={handleChange} />
       )
}

{/* const options = [

  
  // ...
  { value: 'Stanford University', label: 'Stanford' },
  {value: 'Oxford University',label:'Oxford'}
  // ...
]; */}

// const renderSelect = field => (
//   <div>
//     <select {...field.input}/>
//     {/* {field.touched && field.error && <div className="error">{field.error}</div>} */}
//   </div>
// );

// const field = ({client}) => (
//   <Select
//       name="client"
//       value="company_name"
//       options={client}
//       textField="company_name"
//       onChange={val => console.log(val)}
//   />
// );


function FieldGroup({ id, label, help, ...props }) {
    return (
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  }
class Form2 extends Component{

    state = {
        client: []
    };

    

    componentDidMount(){
        axios
      .get("http://localhost:3004/clients")
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

        //const className = `form-input ${field.meta.touched && field.meta.error ? 'has-error':''}`
        return(
    
          <div >
            {/* <label>{field.myLabel}</label>
            <input 
            type="text"
            {...field.input}
            />
            <div className="error">
              {field.meta.touched ? field.meta.error:''}
            </div> */}
            <FieldGroup
                id="formControlsText"
                type="text"
                label={field.myLabel}
                placeholder="Enter text"
                {...field.input}
            />
          </div>
        )
      }
    
      renderInputDateField(field){
        const className = `form-input ${field.meta.touched && field.meta.error ? 'has-error':''}`
    
        return(
          <div className={className}>
            {/* <label>{field.myLabel}</label>
            <input 
            type="date"
            {...field.input}
            />
            <div className="error">
              {field.meta.touched ? field.meta.error:''}
            </div> */}
            <FieldGroup
                id="formControlsText"
                type="date"
                label={field.myLabel}
                placeholder="Enter date"
                {...field.input}
            />
          </div>
        )
      }

      renderInputFloatField(field){
        const className = `form-input ${field.meta.touched && field.meta.error ? 'has-error':''}`
    
        return(
          <div className={className}>
            <FieldGroup
            id="formControlsText"
            type="number"
            label={field.myLabel}
            placeholder="00"
            {...field.input}
          />
          </div>
        )
      }

    onSubmit(values){
      console.log("Submit")
      console.log(values)
        this.props.addOrder(values,()=>{
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
            
                <div className="Form" >
                    <div className="top">
                        <h3>Add a Client</h3>
                        <Link to="/orderdisplay">Back</Link>
                    </div>
            
                        <div className="form-child" id="left">
                            <form onSubmit={this.props.handleSubmit((event)=>this.onSubmit(event))}>
                                                       
                            <Field
                                myLabel="Client's Plant Address"
                                name="address"
                                component={this.renderInputField}
                            />
                            
                            <Field
                                myLabel="Distance"
                                name="distance"
                                component={this.renderInputFloatField}
                            />
                            <Field
                                myLabel="Date of Order"
                                name="order_date"
                                component={this.renderInputDateField}
                            />
                            <Field 
                              myLabel="Clients"
                              name="client"
                              component={DropdownListField}
                              data={this.state.client}
                             // onChange={this.props.handleChange((event)=>this.onChange(event))}
                             //onChange={(evt)=>{console.log("Changed Value:",evt.target.value);}}
                              valueField="id"
                              textField="company_name"
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
      success:state.data,
      
    }
  }
  
function mapDispatchToProps(dispatch){
    return bindActionCreators({addOrder} , dispatch);
}

  export default reduxForm({
    validate,
    form:'PostOrder'
  })(
    connect(mapStateToProps,{addOrder})(Form2)

  )