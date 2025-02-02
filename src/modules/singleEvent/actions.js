import request from 'then-request';
import * as ActionTypes from './actionTypes';

export const setEvent = event => (dispatch) => {
  dispatch({ type: ActionTypes.SET_EVENT, payload: event });
};

export const setEventLoading = () => (dispatch) => {
  dispatch({ type: ActionTypes.SET_EVENT_LOADING });
};

export const setEventError = () => (dispatch) => {
  dispatch({ type: ActionTypes.SET_EVENT_ERROR });
};

export const setSignup = signup => (dispatch) => {
  dispatch({ type: ActionTypes.SET_SIGNUP, payload: signup });
};

export const setSignupLoading = () => (dispatch) => {
  dispatch({ type: ActionTypes.SET_SIGNUP_LOADING });
};

export const setSignupError = () => (dispatch) => {
  dispatch({ type: ActionTypes.SET_SIGNUP_ERROR });
};

export const updateEventAsync = eventId => (dispatch, getState) => {
  dispatch(setEventLoading());
  const accessToken = getState().admin.accessToken;
  return request('GET', `${PREFIX_URL}/api/events/${eventId}`, {
    headers: { Authorization: accessToken },
  })
    .then(res => JSON.parse(res.body))
    .then((res) => {
      dispatch(setEvent(res));
    })
    .catch((error) => {
      console.error('Error in updateEventAsync', error);
      dispatch(setEventError());
    });
};

export const attachPositionAsync = quotaId => (dispatch, getState) => {
  dispatch(setSignupLoading());
  const accessToken = getState().admin.accessToken;
  return request('POST', `${PREFIX_URL}/api/signups`, {
    json: { quotaId },
    headers: { Authorization: accessToken },
  })
    .then(res => JSON.parse(res.body))
    .then((res) => {
      dispatch(setSignup(res));
    })
    .catch((error) => {
      console.error('Error in attachPositionAsync', error);
      dispatch(setSignupError());
    });
};

export const completeSignupAsync = (signupId, data) => (dispatch, getState) => {
  dispatch(setSignupLoading());
  const accessToken = getState().admin.accessToken;
  return request('PATCH', `${PREFIX_URL}/api/signups/${signupId}`, {
    headers: { Authorization: accessToken },
    json: {
      editToken: data.editToken,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      answers: data.answers,
    },
  })
    .then(res =>
      JSON.parse(res.body),
    )
    .then((res) => {
      console.log(res);
      if (res.code && res.code !== 200) {
        throw new Error(res.message);
      }
      dispatch(setSignup(res));
      return true;
    })
    .catch((error) => {
      console.error('Error in completeSignupAsync', error);
      dispatch(setSignupError());
      return false;
    });
};

export const cancelSignupAsync = (signupId, editToken) => (dispatch, getState) => {
  dispatch(setSignupLoading());
  const accessToken = getState().admin.accessToken;
  return request('DELETE', `${PREFIX_URL}/api/signups/${signupId}?editToken=${editToken}`, {
    headers: { Authorization: accessToken },
  })
    .then(res => JSON.parse(res.body))
    .then(() => {
      dispatch(setSignup({}));
    })
    .catch((error) => {
      console.error('Error in cancelSignupAsync', error);
      dispatch(setSignupError());
    });
};
