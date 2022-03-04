import React,{useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {useDispatch} from 'react-redux'
import {Login} from '../store/modules/getLogin';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css'
import { useTranslation } from 'react-i18next'
export default function SignInSide() {
  const { t }  = useTranslation(['lang'])
  const user = useSelector(state=> state.Reducers.user);
  const loading = useSelector(state=> state.Reducers.login_pending);
  const login_error = useSelector(action=>action.Reducers.login_error)
  const dispatch = useDispatch();


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    dispatch(Login(data));
 
   
  };

  return (
    <>


   <Grid container component="main" sx={{ height: '100vh' }}>
          
         <div className=" w-full  relative flex flex-col justify-center items-center bg-blue-100 overflow-hidden">
         <div className="md:border md:border-gray-300 bg-white md:shadow-lg shadow-none rounded p-10 rounded-2xl" >
         <Box
                 sx={{
                            display: 'flex',
                   flexDirection: 'column',
                   alignItems: 'center',
                 }}
               >
                      <Typography
                 variant="h1"
                 noWrap
                 component="div"
                 
               >
                    <img alt="logo" src="/img/logo.png" width="100"/>
               </Typography>
                 <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                   <span className="text-black font-bold text-xl block">{t('lang:LOGIN')}</span>
                   
                   <Grid>

             
                   <TextField
                     margin="normal"
                     required
                     fullWidth
                     error={login_error ? true : false}
                     helperText={login_error ? login_error.error.email : null}
                     id="email"
                     label={t('lang:ID')}
                     name="email"
                     autoComplete="email"
                     autoFocus
                     style={{
                         backgroundColor: "#f2f4f8",
                         width: '300px'
                     }}
                   />
                   
                         </Grid>
                   <Grid  >
                     
                   <TextField
                     margin="normal"
                     required
                     fullWidth
                     error={login_error ? true : false}
                     helperText={login_error ? login_error.error.password : null}
                     name="password"
                     label={t('lang:PASSWORD')}
                     type="password"
                     id="password"
                     autoComplete="current-password"
                     style={{
                       backgroundColor: "#f2f4f8",
                       width: '300px'
                   }}/>
                   
     </Grid>
                   <Grid container>
                     <Grid item xs>
                     <FormControlLabel className="text-black font-bold"
                     control={<Checkbox value="remember" color="primary" />}
                     label="자동 로그인"
                   />
                     </Grid>
                     <Grid item>
                     <Link to="#" variant="body2">
                        {t('lang:FINDPASSWORD')}
                       </Link>
                     </Grid>
                   </Grid>
                   
                   <Button
                     type="submit"
                     fullWidth
                     variant="contained"
                     size="large"
                     disabled={loading}
                     sx={{ mt: 3, mb: 2, p:2 }}
                   >
                         <span className="text-white font-bold text-sm">{t('lang:LOGIN')}</span>
                   </Button>
                   {loading && (
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
             )}
               
                   <Link className="text-blue-500  ml-3" to="/register">{t('lang:REGISTER')}</Link>
                 <span className="text-xs text-black block text-center ">{t('lang:NOTID')}</span>
                 </Box>
               </Box>
               
         </div>
         <div className="w-64 md:w-96 h-96 md:h-full bg-blue-200 bg-opacity-30 absolute -top-64 md:-top-96 right-20 md:right-32 rounded-full pointer-events-none -rotate-45 transform"></div>
         <div className="w-96 h-full bg-indigo-200 bg-opacity-20 absolute -bottom-96 right-64 rounded-full pointer-events-none -rotate-45 transform"></div>
     </div>
     
     </Grid>
    
    </>
  

  );
}