import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getCurrentUser, getPermission } from '../../../redux/usersRedux';
import { getSelectedPost } from '../../../redux/postsRedux';

import styles from './PostEdit.module.scss';
import { PostForm } from '../../features/PostForm/PostForm';
import { NotFound } from '../../views/NotFound/NotFound';

class Component extends React.Component {

  renderSite = () => {
    if(this.props.permission !== 'admin' && this.props.currentUser !== this.props.getSelectedPost.user) {
      return (
        <NotFound />
      );
    } else {
      return (
        <PostForm postId={this.props.match.params.id} type={'edit'} />
      );
    }
  };

  render() {
    const {className} = this.props;
    return (
      <div className={clsx(className, styles.root)}>
        {this.renderSite()}
      </div>
    );
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  currentUser: PropTypes.string,
  permission: PropTypes.string,
  getSelectedPost: PropTypes.shape({
    user: PropTypes.string,
  }),
};

const mapStateToProps = (state, props) => {
  const currentUser = getCurrentUser(state);
  const permission =  !getPermission(state) ? 'notAuthorized' : getPermission(state);

  return {
    currentUser,
    permission,
    getSelectedPost: getSelectedPost(state, props.match.params.id),
  };
};

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as PostEdit,
  Container as PostEdit,
  Component as PostEditComponent,
};
