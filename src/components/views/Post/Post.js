import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getSelectedPost } from '../../../redux/postsRedux';
import { getUserById, getCurrentUser } from '../../../redux/usersRedux';
import { getStatusById } from '../../../redux/statusRedux';

import styles from './Post.module.scss';
import { Button } from '../../common/Button/Button';

const Component = ({className, post, user, status, currentUserInfo}) => {

  const statusRender = status => (
    <p>Status: <span className={clsx(styles[status], styles.thicken)}>{status}</span></p>
  );

  const buttonRender = () => {
    if(currentUserInfo.id === user.id || currentUserInfo.permission === 'admin') {
      return (
        <div className={styles.buttonSection}>
          <NavLink to={`/post/${post.id}/edit`}>
            <Button Type='div'>Edit Post</Button>
          </NavLink>
        </div>
      );
    }
  };

  return(
    <div className={clsx(className, styles.root)}>
      <div className={styles.container}>
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
      {buttonRender()}
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  post: PropTypes.object,
  user: PropTypes.object,
  status: PropTypes.object,
  currentUserInfo: PropTypes.object,
};

Component.defaultProps = {
  user: {},
  post: {},
  status: {},
  currentUserInfo: {},
};

const mapStateToProps = (state, props) => {
  const post = getSelectedPost(state, props.match.params.id);
  const user = getUserById(state, post.user);
  const status = getStatusById(state, post.status);
  const currentUser = getCurrentUser(state);
  const currentUserInfo = getUserById(state, currentUser);

  return {
    post,
    user,
    status,
    currentUserInfo,
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
