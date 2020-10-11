/* selectors */
export const getAll = ({users}) => users.userList;
export const getCurrentUser = ({users}) => users.currentUser;
export const getUserById = ({users}, id) => users.userList.filter(user => user.id === id)[0];

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
        ...statePart,
        currentUser: action.payload,
      };
    }
    default:
      return statePart;
  }
};
