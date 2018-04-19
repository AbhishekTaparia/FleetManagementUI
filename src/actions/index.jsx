// json-server --watch db.json --port 3004
const URL = `http://10.20.32.19:8080`
export function getClient(){
    const request = fetch(`${URL}/clients`, { method: 'GET'})
                    .then(response => response.json());
    return {
        type:'GET_CLIENT',
        payload:request
    }
}
//

export function addClient(values,cb){
    const request=fetch(`${URL}/clients`,{
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