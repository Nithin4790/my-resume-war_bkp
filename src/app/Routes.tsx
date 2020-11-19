import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import LoginPage from '../pages/login/LoginPage'
import { HomePage } from '../pages/home/HomePage'
import SecuredRoute from './SecuredRoute'
import PublicRoute from './PublicRoute'
import SignupPage from '../pages/signup/SignupPage'
import MainPage from '../pages/main/MainPage'

const NoMatch = () => <div>Page not found.</div>

export const Routes: React.FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />

        <PublicRoute path="/home" component={HomePage} />

        <PublicRoute path="/login" component={LoginPage} />

        <SecuredRoute path="/main" component={MainPage} exact />

        <PublicRoute path="/signup" component={SignupPage} />

        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  )
}
