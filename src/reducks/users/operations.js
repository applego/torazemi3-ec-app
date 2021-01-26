import { signInAction } from './actions';
import { push } from 'connected-react-router';

export const signIn = () => {
  return async (dispatch, getState) => {
    const state = getState()
    const isSignedIn = state.users.isSigndIn

    if (!isSignedIn) {
      // 一旦　非同期処理仮
      // const url = 'https://api.github.com/users/deatiger';
      const url = 'https://api.github.com/users/applego';

      const response = await fetch(url)
        .then(res => res.json())
        .catch(() => null);

      const username = response.login;

      dispatch(signInAction({
        isSignedIn: true,
        uid: "00001",
        username: username
      }));
      dispatch(push('/'));
    }
  }
}
