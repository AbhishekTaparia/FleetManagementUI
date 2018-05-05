// json-server --watch db.json --port 3004
const URL = `http://10.20.34.164:8080`
const vara = process.argv[2]

export default URL;

export function getClient(){
    const request = fetch(`${URL}/clients`, { method: 'GET'})
                    .then(response => response.json());
    return {
        type:'GET_CLIENT',
        payload:request
    }
}
//

export function addDistance(values,cb){
    const request=fetch(`${URL}/distance`,{
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
        }).then(
          //  () => cb()
        )

        return {
            type:'ADD_CLIENT',
            payload:'everything went fine'
    }
}

export function addTripExp(values,cb){
    const request=fetch(`${URL}/tripexp`,{
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
        }).then(
          //  () => cb()
        )

        return {
            type:'ADD_CLIENT',
            payload:'everything went fine'
    }
}

export function addInsurance(values,cb){
    const request=fetch(`${URL}/insurances`,{
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
        }).then(
          //  () => cb()
        )

        return {
            type:'ADD_INSURANCE',
            payload:'everything went fine'
    }
}

export function updateClient(id, data) {
    return fetch(`${URL}/clients/` + id, {
        method: 'PUT',
        mode: 'CORS',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        return res;
    }).catch(err => err);
}

export function driverDetails(id){
    const request = fetch(`${URL}/driverIndividual?id=${id}`,{method:'GET'})
    .then(response => response.json())

    console.log(request)
    return{
        type:'ADD_CLIENT',
        payload:request
    } 
}


export function addTax(values,cb){
    const request=fetch(`${URL}/taxes`,{
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
        }).then(
          //  () => cb()
        )

        return {
            type:'ADD_CLIENT',
            payload:'everything went fine'
    }
}


export function addTask(values,cb){
    const request=fetch(`${URL}/task`,{
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
        }).then(
          //  () => cb()
        )

        return {
            type:'ADD_TASK',
            payload:'everything went fine'
    }
}

export function addDeliver(values,cb){
    const request=fetch(`${URL}/delivers`,{
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
        }).then(
          //  () => cb()
        )

        return {
            type:'ADD_CLIENT',
            payload:'everything went fine'
    }
}

export function addClient(values,cb){
    
    const request=fetch(`${URL}/clients`,{
        method:'POST',
        mode: 'CORS',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        
        body: JSON.stringify(values)
        }).then(
            console.log(JSON.stringify(values))
          //  () => cb()
        )

        return {
            type:'ADD_CLIENT',
            payload:'everything went fine'
    }
}

export function addNote(values,cb){
    
    const request=fetch(`${URL}/notes`,{
        method:'POST',
        mode: 'CORS',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        
        body: JSON.stringify(values)
        }).then(
            console.log(JSON.stringify(values))
          //  () => cb()
        )

        return {
            type:'ADD_CLIENT',
            payload:'everything went fine'
    }
}


export function getFleets(){
    const request = fetch(`${URL}/fleets`, { method: 'GET'})
                    .then(response => response.json());
    return {
        type:'GET_FLEETS',
        payload:request
    }
}

export function addFleet(values,cb){
    const request=fetch(`${URL}/fleets`,{
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
        }).then(
          //  () => cb()
        )

        return {
            type:'ADD_FLEET',
            payload:'everything went fine'
    }
}

export function getDrivers(){
    const request = fetch(`${URL}/drivers`, { method: 'GET'})
                    .then(response => response.json());
    return {
        type:'GET_DRIVERS',
        payload:request
    }
}


export function addDriver(values,cb){
    const request=fetch(`${URL}/drivers`,{
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
        }).then(
          //  () => cb()
        )

        return {
            type:'ADD_DRIVER',
            payload:'everything went fine'
    }
}

export function addOrder(values,cb){
    const request=fetch(`${URL}/orders`,{
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
        }).then(
          //  () => cb()
        )

        return {
            type:'ADD_ORDER',
            payload:'everything went fine'
    }
}