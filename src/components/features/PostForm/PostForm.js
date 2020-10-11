import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getSelectedPost, updatePost } from '../../../redux/postsRedux';
import { getAllStatus } from '../../../redux/statusRedux';

import styles from './PostForm.module.scss';
import {Button} from '../../common/Button/Button';

class Component extends React.Component {
  state = {
    title: this.props.selectedPost.title || '',
    description: this.props.selectedPost.description || '',
    statusId: this.props.selectedPost.statusId || '',
    price: this.props.selectedPost.price || '',
  }

  stateChange(value, key, postId, func) {
    this.setState({
      ...this.state,
      [key]: value,
    });
    func(value, key, postId);
  }

  render() {
    const {className, selectedPost, allStatus, updatePost, type} = this.props;
    return (
      <div className={clsx(className, styles.root)}>
        <div className={styles.container}>
          <form>
            <label htmlFor='title'>Title:</label>
            <input
              type='text'
              id='title'
              minLength='10'
              value={this.state.title}
              onChange={event => this.stateChange(event.currentTarget.value ,event.currentTarget.id, selectedPost.id, updatePost)}
              required
            />
            <label htmlFor='description'>Description:</label>
            <textarea
              id='description'
              minLength='20'
              value={this.state.description}
              onChange={event => this.stateChange(event.currentTarget.value ,event.currentTarget.id, selectedPost.id, updatePost)}
              required
            />
            <label htmlFor='statusId'>Status:</label>
            <select
              name='statusId'
              id='statusId'
              defaultValue={this.state.statusId}
              onChange={event => this.stateChange(event.currentTarget.value ,event.currentTarget.id, selectedPost.id, updatePost)}
              required
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
              value={this.state.price}
              onChange={event => this.stateChange(event.currentTarget.value ,event.currentTarget.id, selectedPost.id, updatePost)}
              required
            />
            {type === 'Add'
              ?
              <Button>Add new</Button>
              :
              null
            }
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
  type: PropTypes.string,
};

Component.defaultProps = {
  selectedPost: {},
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
