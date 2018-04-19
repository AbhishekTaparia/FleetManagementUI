import { combineReducers} from 'redux';

//import messages from './message_reducers';
import client from './client_reducers'
import fleet from './fleet_reducers'
import driver from './driver_reducers'
import order from './order_reducers'
import {reducer as fromReducers} from 'redux-form'

const rootReducer = combineReducers({
    //messages,
    client,
    fleet,
    driver,
    order,
    form:fromReducers
})

export default rootReducer;