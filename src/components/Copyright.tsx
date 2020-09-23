import { Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

const Copyright: React.FunctionComponent = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link to="/home">my-resume</Link>
      &nbsp;
      {`${new Date().getFullYear()}.`}
    </Typography>
  )
}

export default Copyright
