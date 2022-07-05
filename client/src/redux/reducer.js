const initialState  = {
    dogs : [],
    allDogs : [],
    temperament: [],
    allTemperament: [],
    detail: []
}

function rootReducer ( state = initialState, action) {
    switch (action.type) {
        case 'GET_DOGS':
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload,
            }
        case 'GET_DETAIL':
            return {
                ...state,
                detail: action.payload,
            }
        default:
            return state
    }
}

export default rootReducer;