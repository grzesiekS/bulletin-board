import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getSelectedPost } from '../../../redux/postsRedux';
import { getAllStatus } from '../../../redux/statusRedux';

import styles from './PostForm.module.scss';


class Component extends React.Component {

  render() {
    const {className, selectedPost, allStatus} = this.props;
    return (
      <div className={clsx(className, styles.root)}>
        <div className={styles.container}>
          <form>
            <label htmlFor='title'>Title:</label>
            <input type='text' id='title' maxLength='10' value={selectedPost.title}></input>
            <label htmlFor='description'>Description:</label>
            <textarea id='description' maxLength='20' value={selectedPost.description}></textarea>
            <label htmlFor='statusId'>Status:</label>
            <select name='statusId' id='statusId' defaultValue={selectedPost.statusId}>
              {allStatus.map(status => (
                <option key={status.id} value={status.id}>{status.statusName}</option>
              ))}
            </select>
            <label htmlFor='price'>Price:</label>
            <input id='price' type='number' min='0' value={selectedPost.price}></input>
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
};

Component.defaultProps = {
  selectedPost: [],
  allStatus: [],
};

const mapStateToProps = (state, props) => ({
  selectedPost: getSelectedPost(state, props.postId),
  allStatus: getAllStatus(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as PostForm,
  Container as PostForm,
  Component as PostFormComponent,
};
