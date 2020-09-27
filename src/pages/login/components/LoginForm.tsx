import React, { useEffect } from 'react'
import { Formik, Form, FormikProps } from 'formik'
import * as Yup from 'yup'
import { makeStyles, Theme, InputAdornment, TextField, Button } from '@material-ui/core'
import NameIcon from '@material-ui/icons/SupervisorAccount'
import LockIcon from '@material-ui/icons/Lock'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { authenticateUser } from '../loginSlice'
import { RootState } from '../../../app/rootReducer'

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
  const isLoggedIn = useSelector((state: RootState) => state.loginReducer.isLogged)

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/dashboard')
    }
  }, [history, isLoggedIn])

  interface LoginType {
    identifier: string
    password: string
  }

  const initialLoginVals: LoginType = {
    identifier: '',
    password: '',
  }

  const handleSubmit = async (auth: LoginType) => {
    dispatch(authenticateUser(auth.identifier, auth.password))
  }

  return (
    <div>
      <Formik
        initialValues={initialLoginVals}
        validationSchema={Yup.object().shape({
          identifier: Yup.string().required('Email/Username is required'),
          password: Yup.string().required('Password is required'),
        })}
        onSubmit={(values: LoginType) => {
          handleSubmit(values)
        }}
      >
        {(props: FormikProps<LoginType>) => {
          const {
            values,
            touched,
            errors,
            handleBlur,
            handleChange,
            isSubmitting,
          } = props
          return (
            <Form>
              <TextField
                variant="outlined"
                margin="normal"
                helperText={touched.identifier ? errors.identifier : ''}
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
                helperText={touched.password ? errors.password : ''}
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
                disabled={isSubmitting}
              >
                Sign In
              </Button>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default LoginForm
