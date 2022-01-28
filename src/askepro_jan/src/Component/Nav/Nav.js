import userEvent from "@testing-library/user-event";
import React, { useState, useEffect, Component } from "react";
import { Link, useHistory, useLocation, withRouter } from 'react-router-dom';
import { Button, Menu, Icon, Header, Dropdown } from "semantic-ui-react";
import { HashLink } from 'react-router-hash-link';
import PropTypes from "prop-types";
import '../../Sass/nav.scss';
import Accepted from "../popup/accepted";
import ToggleNav from "../toggle_nav";
let newLocation;
export function Nav() {
const location= useLocation()
  const [isAdmin, setisAdmin] = React.useState(false);
 newLocation= location.pathname.split("/")
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("token")
  const [name, setName] = useState(false);
  const [pop, setPop] = useState(false);
  let fullname;

useEffect(() => {
    
    if (token) {
      let name = localStorage.getItem("name");
      fullname = name.split(' ');
      if (fullname.length > 1) {
        setName(fullname[0])
      }
      else {
        setName(name);
      }
      setIsLoggedIn(true);
    }
    else {
      setIsLoggedIn(false)
    }
    // getUser();
  }, [token]);


  const getUser = async () => {
    const id = localStorage.getItem("id");
    let user = await (
      await fetch(`${process.env.REACT_APP_BASE_URL}/users/${id}`, {
        method: "GET",
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
    ).json();
    user = user.data;

    if (user && user.isAdmin) {
      setisAdmin(true);
    }

  }
  const handleClick = () => {
    setPop(false);
    localStorage.clear();
    history.push("/login");
    window.location.reload();

  }
  const msg="Are you sure you want to logout?"
  return (
    <>
      <header>
        <div className='logo'>
          <a href="#"><img src={process.env.PUBLIC_URL + "/Assets/Logo/brand.png"} alt='logo' /></a>
        </div>
        {
          open ? <Icon name='close' onClick={() => setOpen(!open)} /> : <Icon name='bars' onClick={() => setOpen(!open)} />
        }
        {
          open && <ToggleNav />
        }
          {isAdmin ? <nav>
          <div className='nav-brand'>
            <a href="/admin"> <img src={process.env.PUBLIC_URL + "/Assets/Logo/brand.png"} alt='logo' /></a>
          </div> <div className="btn-group">
                {/* <Icon name='bell outline' /> */}
                <div class='dropdown-btn'>
                  <Icon name='user outline' />
                  <Dropdown text={name}>
                    <Dropdown.Menu className='dropdown-menu'>
                    <Link to={'/admin'}><li className='item-name' style={{ color: "#000" }}><Icon name='dashboard' />Dashboard</li></Link>
                      <li className='item-name'  onClick={()=>setPop(true)}><Icon name='logout' size="large" />Logout</li>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              </nav>
            :<nav>
          <div className='nav-brand'>
            <a href="/"> <img src={process.env.PUBLIC_URL + "/Assets/Logo/brand.png"} alt='logo' /></a>
          </div>
          <MenuBar location={newLocation[1]} oldLocation={newLocation[0]} />
           { isLoggedIn ?
              <div className="btn-group">
                {/* <Icon name='bell outline' /> */}
                <div class='dropdown-btn'>
                  <Icon name='user outline' />
                  <Dropdown text={name}>
                    <Dropdown.Menu className='dropdown-menu'>
                      <Link to={'/account'}><li className='item-name' style={{ color: "#000" }}><Icon name='user outline' />My Account</li></Link>
                      <Link to={'/history'}><li className='item-name' style={{ color: "#000" }}><Icon name='history' />History</li></Link>
                      <Link to={'/docs'}><li className='item-name' style={{ color: "#000" }}><Icon name='file outline' />My Documnets</li></Link>
                      <li className='item-name' onClick={()=>setPop(true)}><Icon name='logout' size="large" />Logout</li>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              :
              <div className="action-group">
                <Link to="/login"><button className="same-btn" style={{ marginRight: '30px' }}>LOGIN</button></Link>
                <HashLink to="/service#section1"><button className='same-btn'>APPLY NOW</button></HashLink>
              </div>
              
          }
        </nav>}
        <Accepted open={pop} check={true} msg={msg} onClose={()=>setPop(false)} onSubmit={()=>handleClick()}/>
      </header>
    </>
  );
}


export class MenuBar extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  }
  state = { activeItem: newLocation[1], homeIndex: newLocation[0] }
  
  handleItemClick = (e, { name }) => {
    if (name === 'services')
      this.setState({ activeItem: 'service' })
    else if (name === 'home')
      this.setState({ homeIndex: "", activeItem: undefined })
    else
      this.setState({ activeItem: name })
  }
  render() {
    const { location } = this.props
    const { activeItem, homeIndex } = this.state
    
    return (
      <div className="nav_buttons">
        <Menu pointing secondary>
          <Link to='/'
            style={{margin:"0 25px"}}
          >
            <Menu.Item
              name='home'
              active={homeIndex? homeIndex=== "" :location===""}
              onClick={this.handleItemClick}
            /></Link>
          <Link to="/service" style={{margin:"0 25px"}}><Menu.Item
            name='services'
            active={homeIndex? homeIndex=== "service" :location==="service"}
            onClick={this.handleItemClick}
          /></Link>
          <Link to="/about" style={{margin:"0 25px"}}><Menu.Item
            name='about'
            active={homeIndex? homeIndex=== "about" :location==="about"}
            onClick={this.handleItemClick}
          />
          </Link>
          <Link to="/contact" style={{margin:"0 25px"}}><Menu.Item
            name='contact'
            active={homeIndex? homeIndex=== "contact" :location==="contact"}
              
            onClick={this.handleItemClick}
          /></Link>
        </Menu>
      </div>
    )
  }
}
export default withRouter(MenuBar)