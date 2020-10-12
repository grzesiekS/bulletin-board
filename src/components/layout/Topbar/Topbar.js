import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

import { connect } from 'react-redux';
import { getAll, getCurrentUser, updateCurrentUser, getUserById } from '../../../redux/usersRedux';
import { filterUserPosts } from '../../../redux/postsRedux';

import styles from './Topbar.module.scss';
import { Button } from '../../common/Button/Button';

class Component extends React.Component {

  userButtons = (permmision, currentUser) => {
    if(permmision === 'notAuthorized') {
      return <Button className={'button-green'}>Log In</Button>;
    } else if (permmision === 'user' || permmision === 'admin') {
      return (
        <div>
          <Button>
            <div onClick={event => {
              event.preventDefault();
              this.props.filterUserPosts(currentUser);
            }}>
              My Posts
            </div>
          </Button>
          <Button className={'button-red'}>Log Out</Button>
        </div>
      );
    }
  }

  render() {
    const {className, users, permmision, updateCurrentUser, currentUser} = this.props;
    return (
      <div className={clsx(className, styles.root)}>
        <NavLink to='/' className={styles.homeButton}>
          <Button Type='div'>
            <FontAwesomeIcon icon={faHome} />
          </Button>
        </NavLink>
        {this.userButtons(permmision, currentUser)}
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
  currentUser: PropTypes.string,
  filterUserPosts: PropTypes.func,
};

const mapStateToProps = state => {
  const currentUser = getCurrentUser(state);
  const permmision = getUserById(state, currentUser).permission;
  return {
    users: getAll(state),
    permmision,
    currentUser,
  };
};

const mapDispatchToProps = dispatch => ({
  updateCurrentUser: user => dispatch(updateCurrentUser(user)),
  filterUserPosts: user => dispatch(filterUserPosts(user)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Topbar,
  Container as Topbar,
  Component as TopbarComponent,
};
