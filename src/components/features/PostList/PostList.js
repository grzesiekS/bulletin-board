import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { connect } from 'react-redux';
import { getAllPosts } from '../../../redux/postsRedux';
import { getCurrentUser } from '../../../redux/usersRedux';

import styles from './PostList.module.scss';
import {Button} from '../../common/Button/Button';
import {PostTemplate} from '../PostTemplate/PostTemplate';

const Component = ({className, currentUser, posts}) => (
  <div className={clsx(className, styles.root)}>
    {currentUser === 'notAuthorized'
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
};

Component.defaultProps = {
  posts: [],
};

const mapStateToProps = (state) => ({
  posts: getAllPosts(state),
  currentUser: getCurrentUser(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as PostList,
  Container as PostList,
  Component as PostListComponent,
};
