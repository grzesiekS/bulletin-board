import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getUserById } from '../../../redux/usersRedux';

import styles from './PostTemplate.module.scss';

const Component = ({title, description, user}) => (
  <div className={styles.root}>
    <p>{title}</p>
    <p>{description}</p>
    <p>{user.userName}</p>
  </div>
);

Component.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  user: PropTypes.object,
};

Component.defaultProps = {
  user: [],
};

const mapStateToProps = (state, props) => ({
  user: getUserById(state, props.userId),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as PostTemplate,
  Container as PostTemplate,
  Component as PostTemplateComponent,
};
