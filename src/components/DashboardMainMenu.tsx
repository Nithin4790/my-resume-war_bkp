import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  ClickAwayListener,
  createStyles,
  Grow,
  makeStyles,
  MenuList,
  Paper,
  Popper,
  Theme,
} from '@material-ui/core'
import { logout } from '../api/Authentication'
import { logoutUser } from '../pages/login/loginSlice'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
  })
)

export type Ref = HTMLDivElement

const DashboardMainMenu = React.forwardRef<Ref>(
  (props, ref: React.Ref<HTMLDivElement>) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const classes = useStyles()
    const [open, setOpen] = React.useState(false)
    const anchorRef = React.useRef<HTMLButtonElement>(null)

    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen)
    }

    const handleClose = (event: React.MouseEvent<EventTarget>) => {
      if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
        return
      }

      setOpen(false)
    }

    function handleListKeyDown(event: React.KeyboardEvent) {
      if (event.key === 'Tab') {
        event.preventDefault()
        setOpen(false)
      }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open)
    React.useEffect(() => {
      if (prevOpen.current === true && open === false) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        anchorRef.current!.focus()
      }

      prevOpen.current = open
    }, [open])

    const handleLogout = () => {
      const result = logout()
      if (result) {
        dispatch(logoutUser())
        history.push('/')
      }
    }

    return (
      <div className={classes.root} ref={ref}>
        <IconButton
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          color="inherit"
          aria-label="account of current user"
        >
          <AccountCircle />
        </IconButton>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper className={classes.paper}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    )
  }
)

export default DashboardMainMenu
