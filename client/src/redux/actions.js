import axios from 'axios'; 

export function getDogs(){
    return async function(dispatch){
        let json = await axios.get('http://localhost:3001/dogs')
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data
        })
    }
}

export function getDetail(id){
    return async function(dispatch){
        try {
            let json = await axios.get(`http://localhost:3001/dogs/${id}`)
            return dispatch({
                type: 'GET_DETAIL',
                payload: json.data
            })
        } catch (error) {
            console.error(error)
        }
    }
}