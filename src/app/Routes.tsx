import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { LoginPage } from '../pages/login/LoginPage'
import { HomePage } from '../pages/home/HomePage'
import { DashboardPage } from '../pages/dashboard/DashboardPage'

const NoMatch = () => <div>Page not found.</div>

export const Routes: React.FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />

        <Route path="/home/">
          <HomePage />
        </Route>

        <Route path="/login/">
          <LoginPage />
        </Route>

        <Route path="/dashboard/">
          <DashboardPage />
        </Route>

        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  )
}
