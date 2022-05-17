// https://contactmentor.com/login-form-react-js-code/
import React, { useState } from "react";
import ReactDOM from "react-dom";

const Login = ({csrfToken}) => {

    // React States
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const onSubmit = (event) => {
      //Prevent page reload
      // event.preventDefault();

      // Via pwellever
      const formdata = new FormData(event.target);

      fetch('/dj-rest-auth/login/', {'method': 'POST', 'credentials': 'include', 'body': formdata,
        headers: {
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFToken': csrfToken,
        }}
      )
        .then(response => response.json())
        // .then(data => console.log(data))
        .then(setIsSubmitted(true));

    };

    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
      name === errorMessages.name && (
        <div className="error">{errorMessages.message}</div>
      );

    // JSX code for login form
    const renderForm = (
      <div className="form">
        <form onSubmit={onSubmit}>
          <div className="input-container">
            <label>Username </label>
            <input type="text" name="username" required />
            {renderErrorMessage("uname")}
          </div>
          <div className="input-container">
            <label>Password </label>
            <input type="password" name="password" required />
            {renderErrorMessage("pass")}
          </div>
          <div className="button-container">
            <input type="submit" />
          </div>
        </form>
      </div>
    );

    return (
      <div className="app">
        <div className="login-form">
          <div className="title">Sign In</div>
          {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
        </div>
      </div>
    );

};

export default Login;
