import './App.css';
import Header from './header'
import {  Navigate } from 'react-router-dom';
import { Routes,Route, BrowserRouter} from 'react-router-dom'
import Login from './login';
import Register from './register'
import Festas from './festas'
import 'typeface-poppins';
import Participate from './participatelist';
import Users from './users'
import { AuthContext, AuthProvider } from './authcontroller';
import { useContext, useState } from 'react';
import Footer from './components/footer';
import {RotatingLines} from 'react-loader-spinner'




function App() {


    const Private = ({children})=>{
      const {authenticated,loading} = useContext(AuthContext)

      if(loading){
        return <div className='loading'>
          
          <RotatingLines  strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="70"
          visible={true} />
        
        </div>
      }

      if(!authenticated){
        return <Navigate to="/login"/>
        
      }
      
      return children
    }

    const LoginRedirect = ({children})=>{
      const {authenticated,loading} = useContext(AuthContext)

      if(loading){
        return <div className='loading'> <RotatingLines  strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="70"
        visible={true} /></div>
      }

      if(authenticated){
        return <Navigate to="/festas"/>
      }

      return children
    }


    
    
 
  return (
  
  
    <BrowserRouter>
    <AuthProvider>
    <Header></Header>
    <Routes>

    <Route path="/participatelist/:id" element={<Private><Participate/></Private>}></Route>
    <Route path="/festas"  element={<Private><Festas/></Private>} > </Route>
    <Route path="/allusers"element={<Private><Users></Users></Private>}></Route>
    <Route path="/login" element={<LoginRedirect><Login/></LoginRedirect>}></Route>
    <Route path="/register" element={<LoginRedirect><Register/></LoginRedirect>}></Route> 
    <Route path="/participatelist/:id/*" element={<Private><Participate/></Private>}></Route>
    <Route path="*" element={<Private><Festas/></Private>}></Route> 
    
    </Routes>
    <Footer/>


    </AuthProvider>
    </BrowserRouter> 
 
   
  );
}

export default App;
