import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getSelectedPost } from '../../../redux/postsRedux';
import { getUserById } from '../../../redux/usersRedux';

import styles from './Post.module.scss';

const Component = ({className, post, user}) => {
  console.log(post);
  console.log(user);
  return(
    <div className={clsx(className, styles.root)}>
      <div className={styles.postInfo}>
        <h2>Post Title: {post.title}</h2>
        <p>{post.description}</p>
        <p>Price: {post.price}€</p>
        <p>Upload: {post.uploadDate}</p>
        <p>Update: {post.updateDate}</p>
      </div>
      <div className={styles.userInfo}>
        <h2>Contact Me</h2>
        <p>Author: {user.userName}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phoneNo}</p>
      </div>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  post: PropTypes.object,
  user: PropTypes.object,
};

Component.defaultProps = {
  user: [],
  post: [],
};

const mapStateToProps = (state, props) => {
  const post = getSelectedPost(state, props.match.params.id);
  const user = getUserById(state, post.userId);

  return {
    post,
    user,
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
