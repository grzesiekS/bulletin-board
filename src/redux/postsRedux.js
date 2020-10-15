import Axios from 'axios';
import shortid from 'shortid';

/* selectors */
export const getAllPosts = ({posts}) => posts.data;
export const getSelectedPost = ({posts}, postId) => {};
export const getLoadingStatus = ({posts}) => posts.loading;

/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const UPDATE_POST = createActionName('UPDATE_POST');
const ADD_NEW_POST = createActionName('ADD_NEW_POST');
const FILTER_USER_POST = createActionName('FILTER_USER_POST');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const updatePost = payload => ({ payload, currentDate: new Date(), type: UPDATE_POST });
export const addNewPost = payload => ({payload, currentDate: new Date(), id: shortid.generate(), type: ADD_NEW_POST});
export const filterUserPosts = payload => ({payload, type: FILTER_USER_POST});

/* thunk creators */
export const fetchAllPosts = () => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());

    Axios
      .get('http://localhost:8000/api/posts')
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const fetchSelectedPost = (id) => {
  return async dispatch => {
    dispatch(fetchStarted());

    try {
      let res = await Axios.get(`http://localhost:8000/api/posts/${id}`);
      await new Promise((resolve, reject) => resolve());
      dispatch(fetchSuccess(res.data));
    } catch(err) {
      dispatch(fetchError(err.message || true));
    }
  };
};

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
                updateDate: action.currentDate.toString(),
              };
            } else {
              return {
                ...data,
              };
            }
          }),
      };
    }
    case ADD_NEW_POST: {
      return {
        ...statePart,
        data: [
          ...statePart.data,
          {
            id: action.id,
            title: action.payload.componentState.title,
            description: action.payload.componentState.description,
            uploadDate: action.currentDate.toString(),
            updateDate: action.currentDate.toString(),
            user: action.payload.currentUser,
            status: action.payload.componentState.statusId,
            price: action.payload.componentState.price,
          },
        ],
      };
    }
    case FILTER_USER_POST: {
      return {
        ...statePart,
        data: statePart.data.filter(data => data.userId === action.payload),
      };
    }
    default:
      return statePart;
  }
};
