import Login from '../components/Login';
import Register from '../components/Register';
import Home from '../layouts/Home';
import {  Chat, Dashboard } from  '@mui/icons-material';
const routes = [
    {path: '/' , exact: true, name: 'main' },
    {path: '/home' , name: 'home', icon: Chat, component: Home},
    {path: '/home2' , name: 'home2' ,icon: Dashboard, component: Register},
];

export default routes;