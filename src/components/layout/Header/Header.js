import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { getAll, getCurrentUser, updateCurrentUser } from '../../../redux/usersRedux';

import styles from './Header.module.scss';
import { Topbar } from '../Topbar/Topbar';

const Component = ({className, children}) => (
  <div className={clsx(className, styles.root)}>
    <Topbar />
    <h2 className={styles.title}>Bulletin Board</h2>
    <div className={styles.image}>
      <img src='/images/pexels-mikechie-esparagoza-1742370.jpg' alt='bulletin-board'/>
    </div>
    {children}
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   users: getAll(state),
//   currentUser: getCurrentUser(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: user => dispatch(updateCurrentUser(user)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as Header,
  // Container as Header,
  Component as HeaderComponent,
};
