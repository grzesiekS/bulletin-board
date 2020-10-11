import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { connect } from 'react-redux';
import { getAllPosts } from '../../../redux/postsRedux';
import { getCurrentUser, getUserById } from '../../../redux/usersRedux';

import styles from './PostList.module.scss';
import {Button} from '../../common/Button/Button';
import {PostTemplate} from '../PostTemplate/PostTemplate';

const Component = ({className, currentUser, posts, permmision}) => (
  <div className={clsx(className, styles.root)}>
    {permmision === 'notAuthorized'
      ?
      null
      :
      <Button>
        <FontAwesomeIcon icon={faPlus} />
        Add New Post
      </Button>
    }
    {posts.map(post => (
      <PostTemplate key={post.id} {...post} />
    ))}
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  posts: PropTypes.array,
  currentUser: PropTypes.string,
  permmision: PropTypes.string,
};

Component.defaultProps = {
  posts: [],
};

const mapStateToProps = (state) => {
  const currentUser = getCurrentUser(state);
  const permmision = getUserById(state, currentUser).permission;
  return{
    posts: getAllPosts(state),
    currentUser,
    permmision,
  };
};

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as PostList,
  Container as PostList,
  Component as PostListComponent,
};
