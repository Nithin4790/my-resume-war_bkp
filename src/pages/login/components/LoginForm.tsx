import React, { useEffect, useState } from 'react'
import { Formik, Form, FormikProps } from 'formik'
import * as Yup from 'yup'
import {
  makeStyles,
  Theme,
  InputAdornment,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core'
import NameIcon from '@material-ui/icons/SupervisorAccount'
import LockIcon from '@material-ui/icons/Lock'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Alert, AlertTitle } from '@material-ui/lab'
import { loginError, loginStart, loginSuccess } from '../loginSlice'
import { loginUser, validateUser } from '../../../api/Authentication'
import { INVALID_CREDS, NETWORK_ERROR } from '../../../utils/error'
import { RootState } from '../../../app/rootReducer'
import { AuthenticationType } from '../../../api/model'

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: '#FFFFFF',
    backgroundColor: theme.palette.primary.main,
  },
}))

const LoginForm: React.FunctionComponent = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const [error, setError] = useState<string | undefined>('')
  const errorState = useSelector((state: RootState) => state.loginReducer.error)

  useEffect(() => {
    setError(errorState)
  }, [dispatch, errorState])

  const rememberedUser = localStorage.getItem('default-user')

  const initialAuthenticationVals: AuthenticationType = {
    identifier: rememberedUser !== null ? rememberedUser : '',
    password: '',
    rememberMe: true,
  }

  const handleSubmit = async (auth: AuthenticationType) => {
    dispatch(loginStart())
    const creds = {
      userIdentifier: auth.identifier,
      userPassword: auth.password,
    }

    if (auth.rememberMe) localStorage.setItem('default-user', auth.identifier)
    else localStorage.removeItem('default-user')

    await loginUser(auth).then((data) => {
      if (validateUser()) {
        dispatch(loginSuccess(creds))
        history.push('/dashboard/')
      } else if (data.response !== 200 || data.response !== 201) {
        dispatch(loginError(INVALID_CREDS))
      } else {
        dispatch(loginError(NETWORK_ERROR))
      }
    })
  }

  return (
    <div>
      <Formik
        initialValues={initialAuthenticationVals}
        validationSchema={Yup.object().shape({
          identifier: Yup.string().required('Email/Username is required'),
          password: Yup.string().required('Password is required'),
        })}
        onSubmit={(values: AuthenticationType) => {
          handleSubmit(values)
        }}
      >
        {(props: FormikProps<AuthenticationType>) => {
          const { values, errors, handleBlur, handleChange } = props
          return (
            <Form>
              <TextField
                variant="outlined"
                margin="normal"
                helperText={errors.identifier}
                error={Boolean(errors.identifier)}
                required
                fullWidth
                id="identifier"
                label="Email Address/Username"
                type="text"
                value={values.identifier}
                onChange={handleChange}
                name="identifier"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <NameIcon />
                    </InputAdornment>
                  ),
                }}
                onBlur={handleBlur}
              />

              <TextField
                variant="outlined"
                margin="normal"
                name="password"
                helperText={errors.password}
                error={Boolean(errors.password)}
                label="Password"
                fullWidth
                type="password"
                value={values.password}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
                onBlur={handleBlur}
              />
              <FormControlLabel
                control={
                  // eslint-disable-next-line react/jsx-wrap-multilines
                  <Checkbox
                    defaultChecked
                    name="rememberUser"
                    color="primary"
                    value={values.rememberMe}
                    onChange={handleChange}
                  />
                }
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
              >
                Sign In
              </Button>
            </Form>
          )
        }}
      </Formik>
      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
    </div>
  )
}

export default LoginForm
