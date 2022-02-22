import axios from "axios";
import { useEffect,useState } from "react";
import {Route , Redirect , Outlet} from 'react-router-dom';
import Swal from 'sweetalert2'
export default function AdminRoute() {

    const [isLogged,setIsLogged] = useState(false);
    useEffect(()=> {
      axios.get('/api/checklogin').then(res=> {
        if(res.data.status === 200) {
          setIsLogged(true);
        }
      }).catch(err=> {
          if(err.response.status == 401) {
              setIsLogged(false);
          }
      })
  
      return () => {
        setIsLogged(false);
      };
    });
  
    return isLogged ? <Redirect to="/login"/> : <Redirect to="/login"/>
}