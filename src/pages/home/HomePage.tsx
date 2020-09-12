import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core'
import Header from '../../components/Header'

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      width: '100%',
      height: '100%',
    },
    loginForm: {
      width: '50%',
    },
  })
)

export const HomePage: React.FunctionComponent = () => {
  const classes = useStyles()
  return (
    <div className={classes.wrapper}>
      <Header />
    </div>
  )
}
