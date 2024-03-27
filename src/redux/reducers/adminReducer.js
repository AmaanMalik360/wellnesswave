const initialState = {
    users: [],
    loading: false,
    error: null,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case "USERS_REQUEST":
        state = {
          ...state,
          loading: true,
        };
        break;
  
      case "USERS_SUCCESS":
        state = {
          ...state,
          users: action.payload,
          loading: false,
        };
        break;
  
      case "USERS_FAILURE":
        state = {
          ...state,
          loading: false,
          error: action.payload.error,
        };
        break;

      case "CLEAR_ADMIN":
        state = {
          ...initialState,
        };
        break;
    }
    return state;
  };
  