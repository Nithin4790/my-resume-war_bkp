/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { ACCESS_TOKEN_KEY } from '../utils/constants'

interface PrivateRouteProps extends RouteProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const PublicRoute = (props: PrivateRouteProps) => {
  const isAuthenticated = localStorage.getItem(ACCESS_TOKEN_KEY)
  const { component: Component, ...rest } = props
  return (
    <Route
      {...rest}
      render={
        (routeProps) =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: '/dashboard/',
                state: { from: routeProps.location },
              }}
            />
          ) : (
            <Component {...routeProps} />
          )
        // eslint-disable-next-line react/jsx-curly-newline
      }
    />
  )
}

export default PublicRoute
