import {DataCon, Url} from '../../utils';
import * as types from '../actionTypes';

export function loadComments(dispatch, articleId) {
  const url = Url.getUrl('/comments', {articleId});
  DataCon.loadDataFromServer(url).then(data => {
    dispatch({
      type: types.LOAD_COMMENTS,
      comments: data.comments,
      articleId
    });
  }).catch(console.error);
}

export function setLastComment(dispatch, id, comment, commentCount) {
  dispatch({
    type: types.SET_LAST_COMMENT,
    articleId: id,
    comment,
    commentCount
  });
}

export function modifyFoldComments(dispatch, id, fold) {
  dispatch({
    type: types.MODIFY_FOLD_COMMENT,
    articleId: id,
    fold
  });
}

export function writeComment(dispatch, articleId, content, parentCommentId) {
  const data = {
    articleId,
    content,
    parentCommentId
  };
  DataCon.postDataToServer(Url.getUrl('/comments'), 'POST', data).then(res => {
    if (parentCommentId) {
      dispatch({
        type: types.WRITE_COMMENT,
        comment: res,
        articleId
      });
    } else {
      dispatch({
        type: types.REPLY_COMMENT,
        comment: res,
        articleId,
        commentId: parentCommentId
      });
    }
  }).catch(console.error);
}

export function editComment(dispatch, commentId, articleId, newContent) {
  DataCon.postDataToServer(Url.getUrl(`/comments/${commentId}`), 'PUT', {
    content: newContent
  }).then(comment => {
    dispatch({
      type: types.EDIT_COMMENT,
      comment,
      articleId
    });
  }).catch(console.error);
}

export function deleteComment(dispatch, commentId, articleId) {
  DataCon.postDataToServer(Url.getUrl(`/comments/${commentId}`), 'DELETE').then(() => {
    dispatch({
      type: types.DELETE_COMMENT,
      commentId,
      articleId
    });
  }).catch(console.error);
}
