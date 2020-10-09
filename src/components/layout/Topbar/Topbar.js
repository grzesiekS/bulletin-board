import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, getCurrentUser, updateCurrentUser } from '../../../redux/usersRedux';

import styles from './Topbar.module.scss';
import { Button } from '../../common/Button/Button';

class Component extends React.Component {

  render() {
    const {className, users, updateCurrentUser} = this.props;
    return (
      <div className={clsx(className, styles.root)}>
        <Button>My Posts</Button>
        <Button className={'button-green'}>Log In</Button>
        <Button className={'button-red'}>Log Out</Button>
        <select name='users' id='users' onChange={event => updateCurrentUser(event.currentTarget.value)}>
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
  currentUser: PropTypes.string,
  updateCurrentUser: PropTypes.func,
};

const mapStateToProps = state => ({
  users: getAll(state),
  currentUser: getCurrentUser(state),
});

const mapDispatchToProps = dispatch => ({
  updateCurrentUser: user => dispatch(updateCurrentUser(user)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Topbar,
  Container as Topbar,
  Component as TopbarComponent,
};
