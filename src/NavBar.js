import React, { Component } from "react"; 
// importing end points react-router-dom
import  { Link, useMatch,
     useResolvedPath,
     useNavigate, useHistory
} from 'react-router-dom'; 
import { useState, useEffect } from "react";
import { GiHamburgerMenu } from 'react-icons/gi'; 

export default function NavBar(){
    const Navigate  = useNavigate(); 
    let user = JSON.parse(localStorage.getItem('user-info')); 
    //  console.warn(user.name);

    {/*** Change navigation bar with size ***/}
    const [size_window, setsize_window] = useState(
        {
          window_width: window.innerWidth,
          window_height: window.innerHeight
        }
    )

    let detctWindow_size = ()=>{
        setsize_window({
            window_width: window.innerWidth,
            window_height: window.innerHeight
        });
    }
    
    useEffect( ()=>{
        window.addEventListener('resize', detctWindow_size); 
        return ()=>{
            window.removeEventListener('resize',detctWindow_size); 
        }
    }, [size_window]); 

    let Logout = () =>{
        localStorage.clear(); 
        sessionStorage.clear(); 
        Navigate('/'); 
    }

    let component_Object=[
    {name:'login',id:'login_part',class_name:'base_registerOption_sign'},
    {name:'register',id:'register_part',class_name:'base_registerOption_sign'},
    {name:'logout',id:'logout_part',class_name:'base_registerOption_sign'}
        ];

    let Navigation_listedLinks=[
       {
        "Profile_navs":{
          Dashboard_link:'Dashboard',
          infos_links:'infos',
          Contact_links:'Contact'
          }, 
        "index_default_navs":{
            Home_links:'Home', 
            Contact_links:'Contact', 
            about_links:'about'
        }
       }   
        
    ]
    
     let navigation = useNavigate();
        const Navigate_register = ()=>{ 
            //use Navigate to /register
            navigation('/register'); 
        }
        const Navigate_login = ()=>{
            //use Navigate to /login
            navigation('/login'); 
        }
        
        {/**** Verify width of the window ****/}
        let size_width = size_window.window_width >= 690;
        
        return(
            <nav className="Navigation_Bar_automate02654">
                
            <div className="logo_base">
              <a href="/">logo</a>
            </div>
            <div className="Object_mainLinkes_NavBar_container"
            style={{display : size_width ? 'block' : 'none'}}>
             <ul className="justice_navigation_Opt">
                {
                    localStorage.getItem('UserId') ?
                    <>
                    <Link to="/Profile/Dashboard">
                    {Navigation_listedLinks[0].Profile_navs.Dashboard_link}
                    </Link>
                    <Link to="/Profile/infos">
                    {Navigation_listedLinks[0].Profile_navs.infos_links}
                    </Link>
                    <Link to="/Contact_us">
                    {Navigation_listedLinks[0].Profile_navs.Contact_links}
                    </Link>
                    </> 
                    : 
                    <>
                    <Link to="/">
                    {Navigation_listedLinks[0].index_default_navs.Home_links}
                    </Link>
                    <Link to="/Contact_us">
                    {Navigation_listedLinks[0].index_default_navs.Contact_links}
                    </Link>
                    <Link to="/About">
                    {Navigation_listedLinks[0].index_default_navs.about_links}
                    </Link>
                    </>
                }
             </ul>
            </div>
            {
                size_width == true ?
            
            <div className="registration_baseMain_selectionBtns" id="identities_component">
                {/* Identifier the Navigation bar with localStorage */}
                {
                    localStorage.getItem('UserId') ?
                <>
                <div className="">
                    {/* Logout btn */}
                    <button className="base_registerOption _logout" 
                    id="logout_part" onClick={Logout}
                     >{component_Object[2].name}
                   </button>
                </div>
                </>
                :
                <>
                <div className="">
                  {/* login btn */}
                 <button className="base_registerOption _sign"
                  id="login_part" onClick={Navigate_login}>{component_Object[0].name}
                 </button>
                </div>
        
                <div className="">
                    {/* register btn */}
                <button className="base_registerOption _sign" 
                id="register_part" 
                onClick={Navigate_register}>{component_Object[1].name}
                </button>
                </div>
                </>

                }

            </div>
             :
             <>
             <div className="navigation_bar_iconSide">
             <GiHamburgerMenu/>
             </div>
             <div className="navigation_linksList">
            { localStorage.getItem('UserId') ?
            <>
                <div className="listInfos_navs">
                
                    <Link to="/Profile/Dashboard">
                    {Navigation_listedLinks[0].Profile_navs.Dashboard_link}
                    </Link>
                    <Link to="/Profile/infos">
                    {Navigation_listedLinks[0].Profile_navs.infos_links}
                    </Link>
                    <Link to="/Contact_us">
                    {Navigation_listedLinks[0].Profile_navs.Contact_links}
                    </Link>
                
                

                </div>
                <div className="listInfos_navs logout">
                     {/* Logout btn */}
                     <a className="" 
                    id="logout_part" onClick={Logout}
                     >{component_Object[2].name}
                   </a>
                </div>
            </>
             :
            <>
                <div className="listInfos_navs">
                
                    <Link to="/">
                    {Navigation_listedLinks[0].index_default_navs.Home_links}
                    </Link>
                    <Link to="/Contact_us">
                    {Navigation_listedLinks[0].index_default_navs.Contact_links}
                    </Link>
                    <Link to="/About_us">
                    {Navigation_listedLinks[0].index_default_navs.about_links}
                    </Link>
            
                </div>
                <div className="listInfos_navs logout">
                     {/* Login btn */}
                     <a className="" 
                    id="logout_part" onClick={Navigate_login}
                     >{component_Object[0].name}
                   </a>
                   {/* Login btn */}
                     <a className="" 
                    id="logout_part" onClick={Navigate_register}
                     >{component_Object[1].name}
                   </a>
                </div>
            </> 
             
            }
            </div>
             </>
            }
            </nav>
        );
}

function Custom_redirectLink({to,child, ...propos}){
    const resolvePath = useResolvedPath(to); 
    const isActive = useMatch({ path: resolvePath.pathname, end: true})

    return( 
        <li className={isActive ? "active" : ""}>
            <link to={to} {...propos}>
                {child}
            </link>
        </li>
    )
}

