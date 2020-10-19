import Axios from 'axios';
/* selectors */
export const getAll = ({users}) => users.userList;
export const getCurrentUser = ({users}) => users.currentUser;
export const getUserById = ({users}, id) => users.userList.filter(user => user.id === id)[0];
export const getPermission = ({users}) => users.permission;

/* action name creator */
const reducerName = 'users';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const UPDATE_CURRENT_USER = createActionName('UPDATE_CURRENT_USER');
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');

/* action creators */
export const updateCurrentUser = payload => ({payload, type: UPDATE_CURRENT_USER});
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });

/* thunk creators */
export const fetchAdmin = () => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());

    Axios
      .get('http://localhost:8000/api/userAdmin')
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch(action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        currentUser: action.payload._id,
        permission: action.payload.permission,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case UPDATE_CURRENT_USER: {
      return {
        ...statePart,
        currentUser: action.payload,
      };
    }
    default:
      return statePart;
  }
};
