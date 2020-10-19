import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { connect } from 'react-redux';
import { getAllPosts, fetchAllPosts } from '../../../redux/postsRedux';
import { getCurrentUser, getPermission } from '../../../redux/usersRedux';

import styles from './PostList.module.scss';
import {Button} from '../../common/Button/Button';
import {PostTemplate} from '../PostTemplate/PostTemplate';

class Component extends React.Component {

  componentDidMount() {
    const {loadPosts} = this.props;

    loadPosts();
  }

  render() {

    const {className, posts, permmision} = this.props;

    return (
      <div className={clsx(className, styles.root)}>
        {permmision === 'notAuthorized'
          ?
          null
          :
          <NavLink to='/post/add'>
            <Button Type={'div'}>
              <FontAwesomeIcon icon={faPlus} />
            Add New Post
            </Button>
          </NavLink>
        }
        <nav>
          {posts.map(post => (
            <NavLink key={post._id} to={`/post/${post._id}`}>
              <PostTemplate {...post} />
            </NavLink>
          ))}
        </nav>
      </div>
    );
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  posts: PropTypes.array,
  currentUser: PropTypes.string,
  permmision: PropTypes.string,
  loadPosts: PropTypes.func,
};

Component.defaultProps = {
  posts: [],
};

const mapStateToProps = (state) => {
  const currentUser = getCurrentUser(state);
  const permmision = !getPermission(state) ? 'notAuthorized' : getPermission(state);
  return{
    posts: getAllPosts(state),
    currentUser,
    permmision,
  };
};

const mapDispatchToProps = dispatch => ({
  loadPosts: () => dispatch(fetchAllPosts()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostList,
  Container as PostList,
  Component as PostListComponent,
};
