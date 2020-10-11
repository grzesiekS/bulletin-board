/* selectors */
export const getAllPosts = ({posts}) => posts.data;
export const getSelectedPost = ({posts}, postId) => posts.data.filter(post => post.id === postId)[0];

/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const UPDATE_POST = createActionName('UPDATE_POST');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const updatePost = payload => ({ payload, type: UPDATE_POST });

/* thunk creators */

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
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
        data: action.payload,
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
    case UPDATE_POST: {
      return {
        ...statePart,
        data:
          statePart.data.map(data => {
            if(data.id === action.payload.postId) {
              return {
                ...data,
                [action.payload.id]: action.payload.value,
              };
            } else {
              return {
                ...data,
              };
            }
          }),
      };
    }
    default:
      return statePart;
  }
};
