import React, { useState } from 'react'
import { makeStyles, createStyles, Grid, Button, Card } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import InputText from '../../components/InputText'
import { validateUser } from '../../api/UserAuthenticator'

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      height: 600,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      padding: 50,
      width: 500,
    },
  })
)

export const LoginPage: React.FunctionComponent = () => {
  const classes = useStyles()

  const history = useHistory()

  const [email, setEmail] = useState<string>('')

  const [password, setPassword] = useState<string>('')

  const onEmailChange = (e: React.ChangeEvent<{ value: string }>) => {
    setEmail(e.target.value)
  }

  const onPasswordChange = (evt: React.ChangeEvent<{ value: string }>) => {
    setPassword(evt.target.value)
  }

  const submitLogin = () => {
    validateUser(email, password).then((res) => {
      if (res) {
        history.push('/dashboard')
      }
    })
  }

  return (
    <div className={classes.wrapper}>
      <Card className={classes.card}>
        <Grid container direction="column" spacing={2} justify="center">
          <Grid item>
            <h1>Sign In</h1>
          </Grid>
          <Grid item>
            <InputText
              id="login-email"
              name="email"
              label="Email"
              type="text"
              onChangeFunction={onEmailChange}
            />
          </Grid>
          <Grid item>
            <InputText
              id="login-password"
              name="email"
              label="Password"
              type="password"
              onChangeFunction={onPasswordChange}
            />
          </Grid>

          <Grid item>
            <Button variant="contained" color="primary" onClick={submitLogin}>
              Sign In
            </Button>
          </Grid>
        </Grid>
      </Card>
    </div>
  )
}
