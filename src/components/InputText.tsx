import { makeStyles, createStyles, TextField } from '@material-ui/core'
import React from 'react'

export interface Props {
  type: string
  id: string
  name: string
  label: string
  onChangeFunction: (evt: React.ChangeEvent<{ value: string }>) => void
}

const useStyles = makeStyles(() =>
  createStyles({
    formTextFields: {
      width: 500,
    },
  })
)

const InputText: React.FunctionComponent<Props> = (props: Props) => {
  const classes = useStyles()

  const { id, type, name, label, onChangeFunction } = props
  return (
    <TextField
      id={id}
      className={classes.formTextFields}
      name={name}
      type={type}
      label={label}
      variant="outlined"
      onChange={onChangeFunction}
    />
  )
}

export default InputText
