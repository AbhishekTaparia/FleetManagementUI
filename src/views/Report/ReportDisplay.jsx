import React ,{Component} from 'react';
import ReactTable from 'react-table';
import {BootstrapTable,TableHeaderColumn} from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'
import {DropdownList} from 'react-widgets';
import { Field, reduxForm} from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from  'react-redux';
import { addTripExp } from '../../actions/index';


var data = [
    {id: '1', name: 'qwert', value: '2'},
    {id: 2, name: 'Buster', value: '5'},
    {id: 3, name: 'George Michael', value: '4'}
  ];

const DropdownListField = (props) => {
    function handleChange(option) {
        let value = option
            
        const {valueField} = props
            console.log(valueField)
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
class Report extends Component{
    
    constructor(){
        super()
        this.state={
            data:[]
        }
    }
    
    render() {
        return (
          <div className="App">
            <div>
                <label>Client :</label>
                <Field 
                 myLabel="Deliver ID"
                 name="deliver_id"
                 component={DropdownListField}
                 data={this.state.client}
                 // onChange={this.props.handleChange((event)=>this.onChange(event))}
                //onChange={(evt)=>{console.log("Changed Value:",evt.target.value);}}
                
                 valueField="id"
                 textField="company_name"
                />
            </div>


            <TableDemo data={data}/>
          </div>
        );
      }
}


class TableDemo extends Component{
    render() {
        return (
          <div >
            <BootstrapTable data={this.props.data}>
              <TableHeaderColumn isKey dataField='id'>
                ID
              </TableHeaderColumn>
              <TableHeaderColumn dataField='name'>
                Name
              </TableHeaderColumn>
              <TableHeaderColumn dataField='value'>
                Value
              </TableHeaderColumn>
            </BootstrapTable>
          </div>
        );
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
    return bindActionCreators({addTripExp} , dispatch);
}

export default reduxForm({
    validate,
    form:'PostOrder'
  })(
    connect(mapStateToProps,{addTripExp})(Report)

  )
//export default Report;
