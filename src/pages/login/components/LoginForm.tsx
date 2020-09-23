import React from 'react'
import { withFormik, FormikProps } from 'formik'
import * as Yup from 'yup'
import {
  InputAdornment,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core'
import Button from '@material-ui/core/Button/Button'
import NameIcon from '@material-ui/icons/SupervisorAccount'
import LockIcon from '@material-ui/icons/Lock'
import { loginUser } from '../../../api/Authentication'

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
  errorText: {
    color: '#FF0000',
  },
}))

interface LoginValues {
  identifier: string
  password: string
}

interface InitialLoginValues {
  initialIdentifier?: string
  initialPassword?: string
}

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Form = (props: FormikProps<{ identifier: string; password: string }>) => {
  const classes = useStyles()
  const {
    values: { identifier, password },
    errors,
    touched,
    handleSubmit,
    handleChange,
    isValid,
  } = props
  return (
    <form onSubmit={handleSubmit} className={classes.form}>
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
        value={identifier}
        onChange={handleChange}
        name="identifier"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <NameIcon />
            </InputAdornment>
          ),
        }}
      />
      <div>
        <Typography variant="body2" gutterBottom className={classes.errorText}>
          {errors.identifier ? errors.identifier : ''}
        </Typography>
      </div>

      <TextField
        variant="outlined"
        margin="normal"
        name="password"
        helperText={touched.password ? errors.password : ''}
        error={Boolean(errors.password)}
        label="Password"
        fullWidth
        type="password"
        value={password}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          ),
        }}
      />
      <div>
        <Typography variant="body2" gutterBottom className={classes.errorText}>
          {errors.password}
        </Typography>
      </div>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        className={classes.submit}
        disabled={!isValid}
      >
        Sign In
      </Button>
    </form>
  )
}

const LoginForm = withFormik<InitialLoginValues, LoginValues>({
  mapPropsToValues: (props) => ({
    identifier: props.initialIdentifier || '',
    password: props.initialPassword || '',
  }),

  validationSchema: Yup.object().shape({
    identifier: Yup.string().required('Email or Username is required'),
    password: Yup.string().required('Password is required'),
  }),

  handleSubmit({ identifier, password }: LoginValues) {
    loginUser(identifier, password)
  },
})(Form)

export default LoginForm
