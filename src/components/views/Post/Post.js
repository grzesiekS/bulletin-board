import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getSelectedPost } from '../../../redux/postsRedux';
import { getUserById } from '../../../redux/usersRedux';
import { getStatusById } from '../../../redux/statusRedux';

import styles from './Post.module.scss';

const Component = ({className, post, user, status}) => {

  const statusRender = status => (
    <p>Status: <span className={clsx(styles[status], styles.thicken)}>{status}</span></p>
  );

  return(
    <div className={clsx(className, styles.root)}>
      <div className={styles.postInfo}>
        <h2>Post Title: {post.title}</h2>
        <p>{post.description}</p>
        <p>Price: <span className={styles.thicken}>{post.price}€</span></p>
        <p>Upload: <span className={styles.thicken}>{post.uploadDate}</span></p>
        <p>Update: <span className={styles.thicken}>{post.updateDate}</span></p>
        {statusRender(status.statusName)}
      </div>
      <div className={styles.userInfo}>
        <h2>Contact Me</h2>
        <p>Author: <span className={styles.thicken}>{user.userName}</span></p>
        <p>Email: <span className={styles.thicken}>{user.email}</span></p>
        <p>Phone: <span className={styles.thicken}>{user.phoneNo}</span></p>
      </div>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  post: PropTypes.object,
  user: PropTypes.object,
  status: PropTypes.object,
};

Component.defaultProps = {
  user: [],
  post: [],
  status: [],
};

const mapStateToProps = (state, props) => {
  const post = getSelectedPost(state, props.match.params.id);
  const user = getUserById(state, post.userId);
  const status = getStatusById(state, post.statusId);

  return {
    post,
    user,
    status,
  };
};

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Post,
  Container as Post,
  Component as PostComponent,
};
