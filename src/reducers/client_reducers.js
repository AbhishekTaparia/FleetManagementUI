export default function(state={}, action){
    switch(action.type){
        case 'GET_CLIENT':
            return {...state,list:action.payload};
        case 'ADD_CLIENT':
            return {state,success:action.payload}
        default:
            return state;
    }
}

