import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import * as authActions from '../../store/actions/auth';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router";
import classes from './Signup.module.css';


const Signup = (props) => {

    const history = useHistory();

    let [signupRedirect, setSignupRedirect] = useState(false);
    let successMessage = null;
    let form = null;
    let redirect = null;
    if(props.isAuthenticated) {
        redirect = <Redirect to='/' />
    }

    if(props.signupRedirect) {
        successMessage = <h2>Sign Up Success! <NavLink to='/'>Click Here to Login</NavLink></h2>
        form = null;
    }
    else {
        successMessage=null;
        form = (<Formik 
            initialValues={{username: '', password: '', email: '', confirm_password: ''}}
            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Required';
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                  ) {
                    errors.email = 'Invalid email address';
                  }
                if (values.password !== values.confirm_password) 
                {
                    errors.confirm_password = 'Passwords do not match';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting}) => {
                setTimeout(() => {
                    const data = {
                        username: values.username,
                        password: values.password,
                        confirm_password: values.confirm_password,
                        email: values.email,
                    }
    
                    props.onSignup(data);
                    setSubmitting(false);
                    setSignupRedirect(true);
                    history.push('/login');
                }, 400);
            }} >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form className={classes.signUpForm} onSubmit={handleSubmit}>
                                    <label className={classes.headingTitle}>Sign Up</label>
                        <input
                            placeholder="username"
                            type="text"
                            name="username"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                            />
                        {errors.username && touched.username && errors.username}
                        <input
                            placeholder="email"
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            />
                        {errors.email && touched.email && errors.email}
                        <input
                            placeholder="password"
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password} />
                        {errors.password && touched.password && errors.password}
                        <input
                            placeholder="confirm password"
                            type="password"
                            name="confirm_password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.confirm_password} />
                        {errors.confirm_password && touched.confirm_password && errors.confirm_password}
                        <button type="submit" disabled={isSubmitting}>
                            SIGN UP
                        </button>
                    </form>
                )}
            </Formik>)
    }




 


    return (
        <div className={classes.background}>

            {redirect}
            {successMessage}
            {form}
        </div>
    )
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignup: (data) => dispatch(authActions.signup(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);