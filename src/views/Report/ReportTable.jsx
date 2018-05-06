
import React ,{Component} from 'react';
import ReactTable from 'react-table';
import {BootstrapTable,TableHeaderColumn} from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'


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

export default TableDemo;