import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
  })
)

export const DashboardPage: React.FunctionComponent = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <p>No Saved Resumes.</p>
    </div>
  )
}
