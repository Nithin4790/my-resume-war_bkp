import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core'
import Header from '../../components/Header'

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      height: 600,
    },
  })
)

export const DashboardPage: React.FunctionComponent = () => {
  const classes = useStyles()
  return (
    <div className={classes.wrapper}>
      <Header />
      <p>Hello World!!!</p>
    </div>
  )
}
