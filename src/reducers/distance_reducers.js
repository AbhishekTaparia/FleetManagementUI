export default function(state={}, action){
    switch(action.type){
        case 'GET_ORDERS':
            return {...state,list:action.payload};
        case 'ADD_DISTANCE':
            return {state,success:action.payload}
        default:
            return state;
    }
}

