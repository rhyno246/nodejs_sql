import * as React from 'react';
import logo from '../../logo.svg';
import SearchIcon from '@mui/icons-material/Search';
import SwitchButton from  '../SwitchButton';
const Header = () => {
  
  return (
    <div className="client-header">
        <div className="client-header-logo">
            <div className="container">
              <div className="group-logo">
                <img src={logo} width={100} height={100} alt="logo"/>
                <div className="box-search">
                    <form>
                      <input type="text" placeholder="Search...."/>
                      <button type="submit">
                          <SearchIcon style={{fontSize: "18px"}}/>
                      </button>
                    </form>
                </div>
            </div>
          </div>
        </div>
        <div className="client-header-menu">
          <div className="container">
            <div className="main-menu">
              <ul>
                  <li>Home</li>
              </ul>
              <div className="auth-login">
                <SwitchButton />
                <span>Login</span>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Header