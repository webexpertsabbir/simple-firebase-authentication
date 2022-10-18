
import './App.css';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import app from './firebase/firebase.init';
import { useState } from 'react';


const auth = getAuth(app)


function App() {

  const [user, setUser] = useState({});

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
 
const handelGoogleSignIn = () =>{
//  console.log('google comming soon');
signInWithPopup(auth, googleProvider)
.then(result =>{
  const user = result.user;
  setUser(user)
  console.log(user)
})
  .catch(error =>{
    console.log(error)
})
};

const handelSignOut = () =>{
  signOut(auth)
  .then( () =>{
    setUser({});
  })
  .catch( () =>{
    setUser({});
  })
}

const handelGithubSignIn = () =>{
  signInWithPopup(auth, githubProvider)
  .then(result =>{
    const user =  result.user;
    setUser(user);
    console.log(user);
  })
  .catch(error => {
    console.log(error);
  });
}


  return (
    <div className="App">

      {user.email ? <button onClick={handelSignOut}>Sign Out</button> :
      <><button onClick={handelGoogleSignIn}>Google Sign In</button>
      <button onClick={handelGithubSignIn}>Github Sign in</button></>
      }

      { user.uid && <div>
        <h2>user Name: {user.displayName}</h2>
        <p>Email addres: {user.email}</p>
        <img src={user.photoURL} alt="" />
        </div>
        
      }
      
    </div>
  );
}

export default App;
