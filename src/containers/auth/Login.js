import React from 'react';
import { Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import * as authActions from '../../store/actions/auth';
import { connect } from 'react-redux';
import classes from './Login.module.css';


const Login = (props) => {
    let redirect = null;
    if(props.isAuthenticated) {
        redirect = <Redirect to='/' />
    }

    let form = (<Formik 
        initialValues={{username: '', password: ''}}
        validate={values => {
            const errors = {};

            return errors;
        }}
        onSubmit={(values, { setSubmitting}) => {
            setTimeout(() => {

                props.onAuthorization(values.username, values.password);
                setSubmitting(false);
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
                <form className={classes.LoginForm} onSubmit={handleSubmit}>
                                <h1 className={classes.headingTitle}>Login</h1>
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
                        placeholder="password"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password} />
                    {errors.password && touched.password && errors.password}
                    <button type="submit" disabled={isSubmitting}>
                        LOG IN
                    </button>
                </form>
            )}
        </Formik>)

    return (
        <div className={classes.background}>

            {redirect}
            {form}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthorization: (username, password) => dispatch(authActions.authenticate(username, password)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);