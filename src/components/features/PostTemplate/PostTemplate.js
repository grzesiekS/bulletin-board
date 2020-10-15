import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getUserById } from '../../../redux/usersRedux';

import styles from './PostTemplate.module.scss';

const Component = ({title, description, user}) => (
  <div className={styles.root}>
    <div className={styles.postTitle}>
      <h2>{`Post title: ${title}`}</h2>
    </div>
    <p className={styles.description}>{description}</p>
    <p className={styles.user}>{`Author: ${user.userName}`}</p>
  </div>
);

Component.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  user: PropTypes.object,
};

Component.defaultProps = {
  user: {},
};

const mapStateToProps = (state, props) => ({
  user: getUserById(state, props.user),
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
