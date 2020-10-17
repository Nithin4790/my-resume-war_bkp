import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import LoginPage from '../pages/login/LoginPage'
import { HomePage } from '../pages/home/HomePage'
import { DashboardPage } from '../pages/dashboard/DashboardPage'
import SecuredRoute from './SecuredRoute'
import PublicRoute from './PublicRoute'
import SignupPage from '../pages/signup/SignupPage'
import EmailConfirmationPage from '../pages/emailconfirmation/emailconfirmation'

const NoMatch = () => <div>Page not found.</div>

export const Routes: React.FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />

        <Route path="/home">
          <HomePage />
        </Route>

        <PublicRoute path="/login" component={LoginPage} />

        <SecuredRoute path="/dashboard" component={DashboardPage} exact />

        <PublicRoute path="/signup" component={SignupPage} />

        <SecuredRoute path="/emailconfirm" component={EmailConfirmationPage} exact />

        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  )
}
