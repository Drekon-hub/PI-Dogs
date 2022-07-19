const initialState = {
  dogs: [],
  allDogs: [],
  temperament: [],
  temperaments: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_DOGS':
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };
    case 'GET_DETAIL':
      return {
        ...state,
        detail: action.payload,
      };
    case 'POST_ACTIVITY':
      return {
        ...state,
        temperament: [...state.temperament, action.payload],
      };
    case 'GET_DOG_SEARCH':
      return {
        ...state,
        dogs: action.payload,
      };
    case 'GET_TEMP':
      return {
        ...state,
        temperaments: action.payload,
      };
    case 'FILTER_DOGS_BY_TEMPERAMENT':
      return {
        ...state,
        dogs: action.payload,
      };
    case 'FILTER_BY_CREATED':
      const all = state.allDogs;
      const create =
        action.payload === 'all'
          ? all
          : action.payload === 'created'
          ? all.filter((e) => e.createdInDB === true)
          : all.filter((e) => !e.createdInDB);
      return {
        ...state,
        dogs: create,
      };
    case 'FILTER_WEIGHT':
      let orderWeight =
        action.payload === 'asc'
          ? state.dogs.sort(function (a, b) {
              if (a.weight_min < b.weight_min) {
                return 1;
              }
              if (b.weight_min < a.weight_min) {
                return -1;
              }
            })
          : state.dogs.sort(function (a, b) {
              if (a.weight_min < b.weight_min) {
                return -1;
              }
              if (b.weight_min < a.weight_min) {
                return 1;
              }
            });
      return {
        ...state,
        dogs: orderWeight,
      };
    case 'ORDER':
      const sortedArr =
        action.payload === 'asc'
          ? state.dogs.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (a.name > b.name) {
                return -1;
              }
              return 0;
            })
          : action.payload === 'des'
          ? state.dogs.sort((a, b) => {
              if (a.name < b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
              return 0;
            })
          : state.dogs;

      return {
        ...state,
        allDogs: sortedArr,
      };
      case 'DELETE_DOG_BY_ID':
        return {
          ...state,
          allDogs: action.payload,
        };
    default:
      return state;
  }
}

export default rootReducer;
