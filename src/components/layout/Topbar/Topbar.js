import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, getCurrentUser, updateCurrentUser, getUserById } from '../../../redux/usersRedux';

import styles from './Topbar.module.scss';
import { Button } from '../../common/Button/Button';

class Component extends React.Component {

  userButtons = (permmision) => {
    if(permmision === 'notAuthorized') {
      return <Button className={'button-green'}>Log In</Button>;
    } else if (permmision === 'user' || permmision === 'admin') {
      return (
        <div>
          <Button>My Posts</Button>
          <Button className={'button-red'}>Log Out</Button>
        </div>
      );
    }
  }

  render() {
    const {className, users, permmision, updateCurrentUser} = this.props;
    return (
      <div className={clsx(className, styles.root)}>
        {this.userButtons(permmision)}
        <select defaultValue='4' name='users' id='users' onChange={event => updateCurrentUser(event.currentTarget.value)}>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.userName}</option>
          ))}
        </select>
      </div>
    );
  }
}

Component.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array,
  permmision: PropTypes.string,
  updateCurrentUser: PropTypes.func,
};

const mapStateToProps = state => {
  const currentUser = getCurrentUser(state);
  const permmision = getUserById(state, currentUser).permission;
  return {
    users: getAll(state),
    permmision,
  };
};

const mapDispatchToProps = dispatch => ({
  updateCurrentUser: user => dispatch(updateCurrentUser(user)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Topbar,
  Container as Topbar,
  Component as TopbarComponent,
};
