import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getSelectedPost, updatePost, addNewPost } from '../../../redux/postsRedux';
import { getAllStatus, fetchAllStatus } from '../../../redux/statusRedux';
import { getCurrentUser } from '../../../redux/usersRedux';

import styles from './PostForm.module.scss';
import {Button} from '../../common/Button/Button';

class Component extends React.Component {
  state = {
    title: this.props.selectedPost.title || '',
    description: this.props.selectedPost.description || '',
    status: this.props.selectedPost.status || '1',
    price: this.props.selectedPost.price || '',
    postStatus: null,
    postStatusDesc: '',
  }

  componentDidMount() {
    const {loadStatus} = this.props;
    loadStatus();
  }

  stateChange(value, key, postId, func) {
    this.setState({
      ...this.state,
      [key]: value,
    });
    func(value, key, postId);
  }

  stateReset() {
    this.setState({
      ...this.state,
      title: '',
      description: '',
      status: '1',
      price: '',
    });
  }

  postStatusChange(status, desc) {
    this.setState({
      ...this.state,
      postStatus: status,
      postStatusDesc: desc,
    });

    if(status) {setTimeout(() => this.stateReset(), 100);}

    setTimeout(() => {
      this.setState({
        ...this.state,
        postStatus: null,
      });
    }, 2000);
  }

  newPost(user) {
    if(this.state.title && this.state.description && this.state.status && this.state.price) {
      if(this.state.title.length >= 10 && this.state.description.length >= 20 && this.state.price >= 0) {
        this.props.addNewPost(this.state, user);
        this.postStatusChange(true,'New Post Added');
      } else {
        this.postStatusChange(false, 'Something went wrong');
      }
    } else {
      this.postStatusChange(false, 'Something went wrong');
    }
  }

  render() {
    const {className, selectedPost, allStatus, updatePost, type, getCurrentUser} = this.props;
    return (
      <div className={clsx(className, styles.root)}>
        <div className={this.state.postStatus === true ? `${styles.postStatus} ${styles.active}`  : this.state.postStatus === false ? `${styles.postStatus} ${styles.disactive}` : styles.postStatus}>
          <p>{this.state.postStatusDesc}</p>
        </div>
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
            <label htmlFor='status'>Status:</label>
            <select
              name='status'
              id='status'
              defaultValue={this.state.status}
              onChange={event => this.stateChange(event.currentTarget.value ,event.currentTarget.id, selectedPost.id, updatePost)}
              required
            >
              {allStatus.map(status => (
                <option key={status._id} value={status._id}>{status.statusName}</option>
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
              <Button onClick={() => {
                this.newPost(getCurrentUser);
              }}>
                Add new
              </Button>
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
  getCurrentUser: PropTypes.string,
  addNewPost: PropTypes.func,
  loadStatus: PropTypes.func,
};

Component.defaultProps = {
  selectedPost: {},
  allStatus: [],
  loadStatus: () => {},
};

const mapStateToProps = (state, props) => ({
  selectedPost: getSelectedPost(state, props.postId),
  allStatus: getAllStatus(state),
  getCurrentUser: getCurrentUser(state),
});

const mapDispatchToProps = dispatch => ({
  updatePost: (value,id, postId) => dispatch(updatePost({value,id,postId})),
  addNewPost: (componentState, currentUser) => dispatch(addNewPost({componentState, currentUser})),
  loadStatus: () => dispatch(fetchAllStatus()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostForm,
  Container as PostForm,
  Component as PostFormComponent,
};
