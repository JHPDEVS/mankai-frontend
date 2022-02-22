import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import Badge from '@mui/material/Badge'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import SearchIcon from '@mui/icons-material/Search'
import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import { makeStyles } from '@mui/styles'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Redirect, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useDispatch } from 'react-redux'
import { Logout } from '../store/actions'
import { useSelector } from 'react-redux'
import { CircularProgress, Skeleton } from '@mui/material'
import { indigo } from '@mui/material/colors'
import i18n from 'i18next'
import { useTranslation } from 'react-i18next'
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.searchBase, 1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 0.5, 1, 1),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}))
const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: 64,
    },
    [theme.breakpoints.up('sm')]: {
      marginBottom: 56,
    },
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
}))

const ResponsiveAppBar = props => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()

  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const [anchorElLang, setAnchorElLang] = React.useState(null)
  const [anchorElNoti, setAnchorElNoti] = React.useState(null)
  const [notiInput, setNotiInput] = React.useState(null)
  const user = useSelector(state => state.Reducers.user)
  const loading = useSelector(state => state.Reducers.user_pending)
  const noti_count = useSelector(state => state.Reducers.noti_count)
  const noti = useSelector(state => state.Reducers.noti)
  const noti_loading = useSelector(state => state.Reducers.noti_pending)
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget)
  }

  const handleNotiSearch = event => {
    setNotiInput(event.target.value)
  }
  const handleOpenLangMenu = event => {
    setAnchorElLang(event.currentTarget)
  }
  const handleOpenNotiMenu = event => {
    setAnchorElNoti(event.currentTarget)
  }
  const logout = async () => {
    await dispatch(Logout())
  }

  const onChangeLang = lang => {
    i18n.changeLanguage(lang)
    console.log(lang + '으로 언어변경')
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const handleCloseLangMenu = () => {
    setAnchorElLang(null)
  }
  const handleCloseNotiMenu = () => {
    setAnchorElNoti(null)
  }
  const logoutSubmit = e => {
    e.preventDefault()

    axios
      .post('/api/logout')
      .then(res => {
        if (res.status === 200) {
          localStorage.removeItem('auth_token')
          localStorage.removeItem('auth_name')
          Swal.fire('success', res.data.message, 'success')
        }
      })
      .catch(err => {
        if (err.response.status === 401) {
          localStorage.removeItem('auth_token')
          localStorage.removeItem('auth_name')
          Swal.fire('잘못된 접근', '다시 로그인해주세요', 'error')
        }
      })
    logout()
    history.push('/login')
  }
  const { t } = useTranslation(['lang'])
  const settings = [
    { name: t('lang:PROFILEEDIT'), event: null },
    { name: t('lang:LOGOUT'), event: logoutSubmit },
  ]

  return (
    <div className={classes.root}>
      <AppBar
        style={{ boxShadow: 'none' }}
        color="nav"
        className="sticky top-0 z-50"
      >
        <Container maxWidth="xl">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 0, display: { xs: 'none', sm: 'flex' } }}
            >
              <Link to="/">
                <img alt="logo" src="/img/logo.png" width="100" />
              </Link>
            </Typography>

            <Box
              fontWeight="fontWeightBold"
              style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}
            >
              {loading ? <Skeleton width={300} height={50} /> : null}
              {user && !loading ? (
                <>
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder={t('lang:SEARCHPLACE')}
                      inputProps={{ 'aria-label': 'search' }}
                    />
                  </Search>
                  <Button variant="contained" color="button" size="small">
                    검색
                  </Button>
                </>
              ) : null}
            </Box>

            {user && !loading ? (
              <IconButton
                size="large"
                onClick={handleOpenNotiMenu}
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={noti_count} color="error">
                  <NotificationsNoneOutlinedIcon />
                </Badge>
              </IconButton>
            ) : null}

            {user ? (
              <IconButton
                onClick={handleOpenUserMenu}
                size="large"
                color="inherit"
              >
                <Avatar
                  style={{
                    backgroundColor: indigo[300],
                  }}
                >
                  {user.name}
                </Avatar>
              </IconButton>
            ) : null}

            {user ? (
              <IconButton
                onClick={handleOpenLangMenu}
                size="small"
                color="inherit"
              >
                <span>{i18n.language}</span>
              </IconButton>
            ) : null}

            {!user && !loading ? (
              <Link to="/login" className="button">
                <span className="p-1 px-10 font-bold transition-colors duration-700 transform bg-black hover:bg-indigo-400 text-gray-100 text-lg rounded-xl focus:border-4 border-indigo-300">
                  로그인
                </span>
              </Link>
            ) : null}

            {loading ? (
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
              />
            ) : null}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElLang}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElLang)}
              onClose={handleCloseLangMenu}
            >
              <MenuItem
                key="en"
                onClick={handleCloseLangMenu}
                onClick={() => onChangeLang('en')}
              >
                <Typography textAlign="center">en</Typography>
              </MenuItem>
              <MenuItem
                key="ko"
                onClick={handleCloseLangMenu}
                onClick={() => onChangeLang('ko')}
              >
                <Typography textAlign="center">ko</Typography>
              </MenuItem>
              <MenuItem
                key="jp"
                onClick={handleCloseLangMenu}
                onClick={() => onChangeLang('jp')}
              >
                <Typography textAlign="center">jp</Typography>
              </MenuItem>
            </Menu>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElNoti}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNoti)}
              onClose={handleCloseNotiMenu}
            >
              <div class="px-3">
                <div className="border-b-2 mb-2 sticky flex justify-center  top-0 py-3 z-50 bg-white">
                  <div class=" text-gray-700 text-lg font-semibold px-4 py-2">
                    <span>안읽은 알림</span>
                    <Badge
                      className="mx-4 py-1"
                      badgeContent={noti_count}
                      color="error"
                    ></Badge>
                  </div>
                  <div className="shrink text-gray-700 text-lg font-semibold py-2">
                    <span className=" bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-2 border border-blue-500 hover:border-transparent rounded">
                      모두 읽음으로
                    </span>
                  </div>
                </div>
                {noti_loading ? (
                  <MenuItem>
                    <Typography>로딩중</Typography>
                    <CircularProgress
                      size={48}
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-24px',
                        marginLeft: '-24px',
                      }}
                    />
                  </MenuItem>
                ) : (
                  user &&
                  noti.map(noti => (
                    <MenuItem key={noti.id}>
                      <>
                        <div class="flex-1 border rounded-lg px-1 py-2 sm:px-6 sm:py-4 leading-relaxed">
                          <strong>{noti.noti_title}</strong>{' '}
                          <span class="text-xs text-gray-400">
                            {noti.updated_at}
                          </span>
                          <p class="text-sm">{noti.noti_message}</p>
                          <div class="mt-4 flex justify-end">
                            <div class="text-sm text-gray-500 font-semibold text-right">
                              <p className=" text-lg font-bold outline-none focus:outline-none transform transition-all hover:scale-110 text-blue-500 hover:text-blue-600">
                                읽기
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    </MenuItem>
                  ))
                )}
                <div className="border-t-2 border-black-100  sticky flex justify-center  bottom-0 py-3 z-50 bg-white">
                  <Link to="/noti">
                    <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded">
                      알림 더보기
                    </button>
                  </Link>
                </div>
              </div>
            </Menu>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map(setting => (
                <MenuItem
                  key={setting.name}
                  onClick={handleCloseUserMenu}
                  onClick={setting.event}
                >
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}
export default ResponsiveAppBar
