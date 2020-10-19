import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

import { connect } from 'react-redux';
import { getCurrentUser, getPermission, fetchAdmin } from '../../../redux/usersRedux';
import { filterUserPosts } from '../../../redux/postsRedux';

import styles from './Topbar.module.scss';
import { Button } from '../../common/Button/Button';

class Component extends React.Component {

  logIn = async () => {
    const {logInAdmin} = this.props;

    await logInAdmin();
  }

  userButtons = (permmision, currentUser) => {
    if(permmision === 'notAuthorized') {
      return <Button className={'button-green'} onClick={() => this.logIn()}>Log In</Button>;
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
    const {className, permmision, currentUser} = this.props;
    return (
      <div className={clsx(className, styles.root)}>
        <div className={styles.homeButton}>
          <Button href='/'>
            <FontAwesomeIcon icon={faHome} />
          </Button>
        </div>
        {this.userButtons(permmision, currentUser)}
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
  logInAdmin: PropTypes.func,
};

const mapStateToProps = state => {
  const currentUser = getCurrentUser(state);
  const permmision = !getPermission(state) ? 'notAuthorized' : getPermission(state);
  return {
    permmision,
    currentUser,
  };
};

const mapDispatchToProps = dispatch => ({
  filterUserPosts: user => dispatch(filterUserPosts(user)),
  logInAdmin: () => dispatch(fetchAdmin()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Topbar,
  Container as Topbar,
  Component as TopbarComponent,
};
