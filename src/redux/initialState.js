export const initialState = {
  posts: {
    data: [
      {
        id: '1',
        title: 'Post-1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        uploadDate: '08.10.2020',
        updateDate: '10.10.2020',
        user: '1',
        status: '1',
        price: 25,
      },
      {
        id: '2',
        title: 'Post-2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        uploadDate: '05.10.2020',
        updateDate: '8.10.2020',
        user: '2',
        status: '2',
        price: 50,
      },
      {
        id: '3',
        title: 'Post-3',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        uploadDate: '05.10.2020',
        updateDate: '8.10.2020',
        user: '2',
        status: '3',
        price: 150,
      },
    ],
    loading: {
      active: false,
      error: false,
    },
  },
  status: [
    {
      id: '1',
      statusName: 'draft',
    },
    {
      id: '2',
      statusName: 'published',
    },
    {
      id: '3',
      statusName: 'closed',
    },
  ],
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
