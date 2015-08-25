const LOAD = 'bill/LOAD';
const LOAD_SUCCESS = 'bill/LOAD_SUCCESS';
const LOAD_FAIL = 'bill/LOAD_FAIL';

// Only exported for testing action creators
export const _TYPES = [LOAD, LOAD_SUCCESS, LOAD_FAIL];

const initialState = {
  loaded: false
};

export default function billReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.bill && globalState.bill.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/bill.json')
  };
}
