import React from 'react';
import { 
  Route as ReactDOMRoute, 
  RouteProps as ReactDOMRouteProps,
  Redirect
} 
  from 'react-router-dom'

import { useAuth } from '../hooks/AuthContext'

// import { Container } from './styles';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

// true/true = OK
// true/false = OK
// false/true = Redirecionar para o dashboard 
// false/false = OK

const Route: React.FC<RouteProps> = ({ isPrivate = false, component: Component , ...rest }) => {
  const { user } = useAuth()

  return (
    <ReactDOMRoute 
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect to={{ pathname: isPrivate ? '/' : '/dashboard', state: { from: location } }} />
        )
      }}
    />
  )

}

export default Route;