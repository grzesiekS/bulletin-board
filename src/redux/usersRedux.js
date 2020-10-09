/* selectors */
export const getAll = ({users}) => users.userList;
export const getCurrentUser = ({users}) => users.currentUser;

/* action name creator */
const reducerName = 'users';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const UPDATE_CURRENT_USER = createActionName('UPDATE_CURRENT_USER');

/* action creators */
export const updateCurrentUser = payload => ({payload, type: UPDATE_CURRENT_USER});

/* thunk creators */

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch(action.type) {
    case UPDATE_CURRENT_USER: {
      return {
        currentUser: action.payload,
        ...statePart,
      };
    }
    default:
      return statePart;
  }
};
