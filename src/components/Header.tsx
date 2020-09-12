import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    link: {
      fontSize: 15,
      textDecoration: 'none',
      color: 'white',
    },
    title: {
      flexGrow: 1,
    },
  })
)

const Header: React.FunctionComponent = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            MyResume
          </Typography>
          <Link to="/login" className={classes.link}>
            Sign In
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
