import React from 'react'
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

const SignupForm: React.FunctionComponent = () => {
  const classes = useStyles()

  interface SignupType {
    username: string
    email: string
    password: string
    confirmPassword: string
  }

  const initialSignupVals: SignupType = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  const handleSubmit = () => {}

  return (
    <div>
      <Formik
        initialValues={initialSignupVals}
        validationSchema={Yup.object().shape({
          username: Yup.string().required('Username is required'),
          email: Yup.string().required('Email is required'),
          password: Yup.string().required('Password is required'),
          confirmPassword: Yup.string()
            .required('Re-enter password')
            .when('password', {
              is: (val) => !!(val && val.length > 0),
              then: Yup.string().oneOf([Yup.ref('password')], 'Password does not match'),
            }),
        })}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<SignupType>) => {
          const { values, errors, handleBlur, handleChange } = props
          return (
            <Form>
              <TextField
                variant="outlined"
                margin="normal"
                helperText={errors.username}
                error={Boolean(errors.username)}
                required
                fullWidth
                id="username"
                label="Username"
                type="text"
                value={values.username}
                onChange={handleChange}
                name="username"
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
                helperText={errors.email}
                error={Boolean(errors.email)}
                required
                fullWidth
                id="email"
                label="Email"
                type="text"
                value={values.email}
                onChange={handleChange}
                name="email"
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

              <TextField
                variant="outlined"
                margin="normal"
                name="confirmPassword"
                helperText={errors.confirmPassword}
                error={Boolean(errors.confirmPassword)}
                label="Confirm Password"
                fullWidth
                type="password"
                value={values.confirmPassword}
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
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
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
    </div>
  )
}

export default SignupForm
