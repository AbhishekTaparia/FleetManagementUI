import React ,{Component} from 'react';
import ReactTable from 'react-table';
import {BootstrapTable,TableHeaderColumn} from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'
import axios from 'axios'
import URL from '../../actions/index'
//import {DropdownList} from 'react-widgets';
//import { Field, reduxForm} from 'redux-form';
//import { bindActionCreators } from 'redux';
//import { connect } from  'react-redux';
//import { addTripExp } from '../../actions/index';


var data = [
    {id: '1', name: 'qwert', value: '2'},
    {id: 2, name: 'Buster', value: '5'},
    {id: 3, name: 'George Michael', value: '4'}
  ];

var total=0;
class Report extends Component{
    
    constructor(){
        super()
        this.state={
            expData:{},
            expData2:[],
        }
    }
    componentWillMount(){
        axios.get(`${URL}/tripexpense/reports/${this.props.match.params.id}`)
        .then(response=>{
            const expData=response.data;
            const e=[]
            total=response.data.driverExp+response.data.miscExp+response.data.dieselExp+response.data.tollExp+response.data.dailyAllowanceExp+response.data.borderCharges+response.data.repairExp+response.data.cashExp
            e.push(response.data)
            this.setState({expData,
                expData2:e});
            console.log(response.data.deliveryId)
        })
    }
    render() {
        return (
          <div className="App">
            <TableDemo data={this.state.expData2}/>
            Total Expenses : {total} 
          </div>
        );
      }
}


class TableDemo extends Component{
    render() {
        return (
          <div>
            <BootstrapTable data={this.props.data}>
              <TableHeaderColumn isKey dataField='deliveryId'>
                Delivery ID
              </TableHeaderColumn>
              <TableHeaderColumn dataField='tripExpId'>
                Trip ID
              </TableHeaderColumn>
              <TableHeaderColumn dataField='driverExp'>
                Driver Expenses
              </TableHeaderColumn>
              <TableHeaderColumn dataField='miscExp'>
                Misc. Expenses
              </TableHeaderColumn>
              <TableHeaderColumn dataField='dieselExp'>
                Diesel Expenses
              </TableHeaderColumn>
              <TableHeaderColumn dataField='repairExp'>
                Repair Expenses
              </TableHeaderColumn>
              <TableHeaderColumn dataField='tollExp'>
                Toll Expenses
              </TableHeaderColumn>
              <TableHeaderColumn dataField='dailyAllowanceExp'>
                Daily Allowance 
              </TableHeaderColumn>
              <TableHeaderColumn dataField='borderCharges'>
                Border Expenses
              </TableHeaderColumn>
              <TableHeaderColumn dataField='cashExp'>
                Cash Expenses
              </TableHeaderColumn>
            </BootstrapTable>
          </div>
        );
      }
}
 

export default Report;
