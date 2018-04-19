export default function(state={}, action){
    switch(action.type){
        case 'GET_DRIVERS':
            return {...state,list:action.payload};
        case 'ADD_DRIVER':
            return {state,success:action.payload}
        default:
            return state;
    }
}

