import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getSelectedPost, fetchSelectedPost, getLoadingStatus } from '../../../redux/postsRedux';
import { getUserById, getCurrentUser } from '../../../redux/usersRedux';

import styles from './Post.module.scss';
import { Button } from '../../common/Button/Button';

class Component extends React.Component {

  componentDidMount = () => {
    const {selectedPost} = this.props;

    selectedPost(this.props.match.params.id);
  }

  statusRender = status => (
    <p>Status: <span className={clsx(styles[status], styles.thicken)}>{status}</span></p>
  );

  buttonRender = (userInfo, user, post) => {
    if(userInfo.id === user.id || userInfo.permission === 'admin') {
      return (
        <div className={styles.buttonSection}>
          <NavLink to={`/post/${post.id}/edit`}>
            <Button Type='div'>Edit Post</Button>
          </NavLink>
        </div>
      );
    }
  };

  render() {

    const {className, post, loadingStatus} = this.props;

    return (
      <div>

        {loadingStatus !== undefined
          ?
          !loadingStatus.active && post.user !== undefined && post.status !== undefined
            ?
            <div className={clsx(className, styles.root)}>
              <div className={styles.container}>
                <div className={styles.postInfo}>
                  <h2>Post Title: {post.title}</h2>
                  <p>{post.description}</p>
                  <p>Price: <span className={styles.thicken}>{post.price}€</span></p>
                  <p>Upload: <span className={styles.thicken}>{post.uploadDate}</span></p>
                  <p>Update: <span className={styles.thicken}>{post.updateDate}</span></p>
                  {this.statusRender(post.status.statusName)}
                </div>
                <div className={styles.userInfo}>
                  <h2>Contact Me</h2>
                  <p>Author: <span className={styles.thicken}>{post.user.userName}</span></p>
                  <p>Email: <span className={styles.thicken}>{post.user.email}</span></p>
                  <p>Phone: <span className={styles.thicken}>{post.user.phoneNo}</span></p>
                </div>
              </div>
              {/* {this.buttonRender(currentUserInfo, user, post)} */}
            </div>
            :
            null
          :
          null
        }
      </div>
    );
  }
}

Component.propTypes = {
  className: PropTypes.string,
  post: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  currentUserInfo: PropTypes.object,
  selectedPost: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  loadingStatus: PropTypes.shape({
    active: PropTypes.bool,
  }),
};

Component.defaultProps = {
  user: {},
  post: {},
  status: {},
  currentUserInfo: {},
  selectedPost: () => {},
};

const mapStateToProps = (state, props) => {
  const post = getSelectedPost(state, props.match.params.id);
  //const user = getUserById(state, post.user);
  const currentUser = getCurrentUser(state);
  const currentUserInfo = getUserById(state, currentUser);

  return {
    post,
    loadingStatus: getLoadingStatus(state),
    // user,
    currentUserInfo,
  };
};

const mapDispatchToProps = dispatch => ({
  selectedPost: id => dispatch(fetchSelectedPost(id)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Post,
  Container as Post,
  Component as PostComponent,
};
