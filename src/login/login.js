import React from "react";
import "./login.css";

import { useEffect, useState } from 'react';
const googleClientId =  '551070972074-kql8heluj6fk9vtmbvilo99o5fn473ss.apps.googleusercontent.com';// process.env.REACT_APP_GOOGLE_CLIENT_ID;
 
const loadGoogleScript = () => {
  
  //loads the Google JavaScript Library
  (function () {
      const id = 'google-js';
      const src = 'https://apis.google.com/js/platform.js';
      
      //we have at least one script (React)
      const firstJs = document.getElementsByTagName('script')[0];
      
      //prevent script from loading twice
      if (document.getElementById(id)) { return; }
      const js = document.createElement('script'); 
      js.id = id;
      js.src = src;
      js.onload = window.onGoogleScriptLoad; 
      firstJs.parentNode.insertBefore(js, firstJs);
  }());    
  
}



function Login() {

  const [gapi, setGapi] = useState();
  const [googleAuth, setGoogleAuth] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [imageUrl, setImageUrl] = useState();
  
  const onSuccess = (googleUser) => {
    debugger;
    console.log('result from google', googleUser); 

    setIsLoggedIn(true);
    const profile = googleUser.getBasicProfile();
    setName(profile.getName());
    setEmail(profile.getEmail());
    setImageUrl(profile.getImageUrl());
  };
  
  const onFailure = () => {
    setIsLoggedIn(false);
  }
  
  const logOut = () => {
    (async() => {
      await googleAuth.signOut();
      setIsLoggedIn(false);
      renderSigninButton(gapi);
    })();
  };
  
  const renderSigninButton = (_gapi) => {
    _gapi.signin2.render('google-signin', {
      'scope': 'profile email',
      'width': 340,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': onSuccess,
      'onfailure': onFailure 
    });
  }
  
  
  useEffect(() => {
    
    //window.gapi is available at this point
    window.onGoogleScriptLoad = () => {
     
      const _gapi = window.gapi;
      setGapi(_gapi);
      
      _gapi.load('auth2', () => {
        (async () => { 
          const _googleAuth = await _gapi.auth2.init({
           client_id: googleClientId
          });
          setGoogleAuth(_googleAuth);
          renderSigninButton(_gapi);
        })();
      });
    }
    
    //ensure everything is set before loading the script
    loadGoogleScript();
    
  }, []);

  



    return (







      <main>
        <form>
          <section className="form-login">
            <h5>Bienvenido</h5>
            <input
              className="controls"
              type="text"
              name="usuario"
              value=""
              placeholder="Usuario"
            />
            <input
              className="controls"
              type="password"
              name="contrasena"
              value=""
              placeholder="Contraseña"
            />
            {/* <input className="buttons" type="submit" name="" value="Ingresar" /> */}
            <button type="button" className="btn btn-primary">
                  Ingresar
                </button>


                {!isLoggedIn &&
          <div id="google-signin"></div>
        }
        
        {isLoggedIn &&
          <div>
            <div>
              <img src={imageUrl} />
            </div>
            <div>{name}</div>
            <div>{email}</div>
            <button className='btn-primary' onClick={logOut}>Log Out</button>
          </div>
        }








            <p>
              <a href="#">¿Olvidaste tu contraseña?</a>
            </p>
             
          </section>
        </form>
      </main>
    );
  }

export default Login;
