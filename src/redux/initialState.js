export const initialState = {
  users: {
    currentUser: '',
    userList: [
      {
        id: '1',
        userName: 'user1',
        permission: 'user',
        email: 'user1@email.com',
        phoneNo: '000-00-00',
      },
      {
        id: '2',
        userName: 'user2',
        permission: 'user',
        email: 'user2@email.com',
        phoneNo: '111-11-11',
      },
      {
        id: '3',
        userName: 'admin',
        permission: 'admin',
        email: 'admin@email.com',
        phoneNo: '222-22-22',
      },
      {
        id: '4',
        userName: 'not logged user',
        permission: 'notAuthorized',
        email: '',
        phoneNo: '',
      },
    ],
  },
};
