export default function(state={}, action){
    switch(action.type){
        case 'GET_DELIVERS':
            return {...state,list:action.payload};
        case 'ADD_DELIVER':
            return {state,success:action.payload}
        default:
            return state;
    }
}

