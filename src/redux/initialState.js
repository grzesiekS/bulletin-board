export const initialState = {
  posts: {
    data: {},
    loading: {
      active: false,
      error: false,
    },
  },
  users: {
    currentUser: 'notAuthorized',
    userList: [
      {
        id: 1,
        userName: 'user1',
        permission: 'user',
      },
      {
        id: 2,
        userName: 'user2',
        permission: 'user',
      },
      {
        id: 3,
        userName: 'admin',
        permission: 'admin',
      },
      {
        id: 4,
        userName: 'not logged user',
        permission: 'notAuthorized',
      },
    ],
  },
};
