import React, { useEffect } from 'react';
import Login from './containers/auth/Login';
import Logout from './containers/auth/logout';
import Signup from './containers/auth/Signup';
import ForumExplorer from './containers/ForumExplorer/ForumExplorer';
import Discussions from './containers/DIscussions/Discussions';
import Thread from './containers/Thread/Thread';
import ThreadForm from './containers/ThreadForm/ThreadForm';
import Layout from './components/Layout/Layout';
import * as authActions from './store/actions/auth';
import './App.css';
import { Route, Switch, withRouter, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import {useDispatch} from 'react-redux'
import ThreadEditForm from './containers/ThreadEditForm/ThreadEditForm';


function App(props) {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authActions.checkAuthState());
  }, [])

  let routes = <Switch>
    <Route path="/signup" exact component={Signup} />
    <Route path="/logout" exact component={Logout} />
    <Route path="/login" exact component={Login} />
    <Route path="/threads/:id" exact component={Thread} />
    <Route path="/categories/:id" exact component={Discussions} />
    <Route path="/" exact component={ForumExplorer} />
    <Redirect to="/" />
  </Switch>

  if (props.isAuthenticated) {
    routes = <Switch>
    <Route path="/signup" exact component={Signup} />
    <Route path="/logout" exact component={Logout} />
    <Route path="/login" exact component={Login} />
    <Route path="/threads/new" exact component={ThreadForm} />
    <Route path="/threads/:id" exact component={Thread} />
    <Route path="/threads/:id/edit" exact component={ThreadEditForm} />
    <Route path="/categories/:id" exact component={Discussions} />
    <Route path="/" exact component={ForumExplorer} />
    <Redirect to="/" />
  </Switch>
  }



  
  return (
    <div className="App">
      <Layout isAuthenticated={props.isAuthenticated} user={props.user}>
      {routes}
      </Layout>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    user: state.auth.userid,
  }
}

export default withRouter(connect(mapStateToProps)(App));
