import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Topbar.module.scss';
import { Button } from '../../common/Button/Button';

const Component = ({className}) => {
  return (
    <div className={clsx(className, styles.root)}>
      <Button>My Posts</Button>
      <Button className={'button-green'}>Log In</Button>
      <Button className={'button-red'}>Log Out</Button>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as Topbar,
  // Container as Topbar,
  Component as TopbarComponent,
};
