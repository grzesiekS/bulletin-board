import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getSelectedPost, updatePost } from '../../../redux/postsRedux';
import { getAllStatus } from '../../../redux/statusRedux';

import styles from './PostForm.module.scss';


class Component extends React.Component {

  render() {
    const {className, selectedPost, allStatus, updatePost} = this.props;
    return (
      <div className={clsx(className, styles.root)}>
        <div className={styles.container}>
          <form>
            <label htmlFor='title'>Title:</label>
            <input
              type='text'
              id='title'
              minLength='10'
              value={selectedPost.title || ''}
              onChange={event => updatePost(event.currentTarget.value ,event.currentTarget.id, selectedPost.id)}
            />
            <label htmlFor='description'>Description:</label>
            <textarea
              id='description'
              minLength='20'
              value={selectedPost.description || ''}
              onChange={event => updatePost(event.currentTarget.value ,event.currentTarget.id, selectedPost.id)}
            />
            <label htmlFor='statusId'>Status:</label>
            <select
              name='statusId'
              id='statusId'
              defaultValue={selectedPost.statusId || ''}
              onChange={event => updatePost(event.currentTarget.value ,event.currentTarget.id, selectedPost.id)}
            >
              {allStatus.map(status => (
                <option key={status.id} value={status.id}>{status.statusName}</option>
              ))}
            </select>
            <label htmlFor='price'>Price:</label>
            <input
              id='price'
              type='number'
              min='0'
              value={selectedPost.price || ''}
              onChange={event => updatePost(event.currentTarget.value ,event.currentTarget.id, selectedPost.id)}
            />
          </form>
        </div>
      </div>
    );
  }
}

Component.propTypes = {
  className: PropTypes.string,
  selectedPost: PropTypes.object,
  allStatus: PropTypes.array,
  updatePost: PropTypes.func,
};

Component.defaultProps = {
  selectedPost: [],
  allStatus: [],
};

const mapStateToProps = (state, props) => ({
  selectedPost: getSelectedPost(state, props.postId),
  allStatus: getAllStatus(state),
});

const mapDispatchToProps = dispatch => ({
  updatePost: (value,id, postId) => dispatch(updatePost({value,id,postId})),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostForm,
  Container as PostForm,
  Component as PostFormComponent,
};
