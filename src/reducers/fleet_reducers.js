export default function(state={}, action){
    switch(action.type){
        case 'GET_FLEETS':
            return {...state,list:action.payload};
        case 'ADD_FLEET':
            return {state,success:action.payload}
        default:
            return state;
    }
}

