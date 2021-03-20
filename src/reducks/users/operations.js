import { signInAction, signOutAction } from './actions';
import { push } from 'connected-react-router';
import { auth, db, FirebaseTimestamp } from '../../firebase/index';

const usersRef = db.collection('users');

export const listenAuthState = () => {
  return async (dispatch) => {
    return auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        usersRef.doc(String(user.uid)).onSnapshot((snapshot) => {
          console.log(snapshot);
          const data = snapshot.data();
          if (!data) {
            // todo throw new Error('ユーザーデータが存在しません。');
            // data.username = 'user111';
          }

          // Update logged in user state
          dispatch(
            signInAction({
              isSignedIn: true,
              uid: user.uid,
              // todo username: data.username,
              username: 'user111',
            })
          );
        });
      } else {
        dispatch(push('/signin'));
      }
    });
  };
};

//         const uid = user.uid;

//         db.collection('users')
//           .doc(uid)
//           .get()
//           .then((snapshot) => {
//             const data = snapshot.data();
//             dispatch(
//               signInAction({
//                 isSignedIn: true,
//                 role: data.role,
//                 uid: uid,
//                 username: data.username,
//               })
//             );
//             dispatch(push('/'));
//           });
//       } else {
//         dispatch(push('signin'));
//       }
//     });
//   };
// };

export const resetPassword = (email) => {
  return async (dispatch) => {
    if (email === '') {
      alert('必須項目が未入力です');
      return false;
    } else {
      return auth
        .sendPasswordResetEmail(email)
        .then(() => {
          alert(
            '入力されたアドレスにパスワードリセット用のメールをお送りしましたのでご確認ください。'
          );
          dispatch(push('/signin'));
        })
        .catch(() => {
          alert('登録されていないメールアドレスです。もう一度ご確認ください。');
        });
    }
  };
};

export const signIn = (email, password) => {
  return async (dispatch) => {
    // Validation
    if (email === '' || password === '') {
      alert('必須項目が未入力です');
      return false;
    }

    auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user;

        if (!user) {
          throw new Error('ユーザーIDを取得できません');
        }
        const uid = user.uid;

        db.collection('users')
          .doc(String(uid))
          .get()
          .then((snapshot) => {
            const data = snapshot.data();
            dispatch(
              signInAction({
                isSignedIn: true,
                //todo role: data.role,
                role: 'customer',
                uid: uid,
                // username: data.username,
                username: 'user111',
              })
            );
            dispatch(push('/'));
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };
};

export const signUp = (username, email, password, confirmPassword) => {
  return async (dispatch) => {
    // redux の雛形
    // Validation
    if (
      username === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      alert('必須項目が未入力です');
      return false;
    }

    if (password !== confirmPassword) {
      alert('パスワードが一致しません。もう一度お試しください。');
      return false;
    }

    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user;

        if (user) {
          const uid = user.uid;
          const timestamp = FirebaseTimestamp.now();

          const userInitialData = {
            created_at: timestamp,
            email: email,
            role: 'customer',
            uid: uid,
            updated_at: timestamp,
            username: username,
          };

          return usersRef
            .doc(String(uid))
            .set(userInitialData)
            .then(async () => {
              // const sendThankYouMail = functions.httpsCallable('sendThankYouMail');
              // await sendThankYouMail({
              //     email: email,
              //     userId: uid,
              //     username:username,
              // });
              dispatch(push('/'));
            });
        } else {
          return alert(
            'アカウント登録に失敗しました。もう一度お試しください。'
          );
        }
      })
      .catch((error) => {
        alert('アカウント登録に失敗しました。もう一度お試しください。');
        throw new Error('error');
      });
  };
};

export const signOut = () => {
  return async (dispatch) => {
    auth.signOut().then(() => {
      dispatch(signOutAction());
      dispatch(push('/signin'));
    });
  };
};
