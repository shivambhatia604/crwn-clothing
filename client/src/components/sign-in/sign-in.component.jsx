import React,{useState} from "react";
import "./sign-in.styles.scss";
import { connect } from "react-redux";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

// import {auth, signInWithGoogle} from '../../firebase/firebase.utils';

import {
  googleSignInStart,
  emailSignInStart,
} from "../../redux/user/user.actions";

const SignIn = ({emailSignInStart,googleSignInStart}) => {

  const [userCredentials,setCredentials] = useState({email:"",password:""});
  
  const { email, password } = userCredentials;

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    emailSignInStart(email,password);
    
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setCredentials({...userCredentials, [name]: value });
  };

    

    return (
      <div className="sign-in">
        <h2 className="title">I alredy have an account</h2>
        <span>Sign in with your email and password</span>

        <form action="" onSubmit={handleSubmit}>
          <FormInput
            name="email"
            type="email"
            value={email}
            handleChange={handleChange}
            label="Email"
            required
          />
          {/* <label>EMAIL</label> */}
          <FormInput
            name="password"
            type="password"
            value={password}
            label="password"
            handleChange={handleChange}
            required
          />
          {/* <label>PASSWORD</label> */}
          <div className="buttons">
            <CustomButton type="submit">Sign In</CustomButton>
            <CustomButton
              type="button"
              onClick={googleSignInStart}
              isGoogleSignIn
            >
              {" "}
              Sign In with google{" "}
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }


const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) => 
    dispatch(emailSignInStart({ email:email, password:password }))
});

export default connect(null, mapDispatchToProps)(SignIn);
