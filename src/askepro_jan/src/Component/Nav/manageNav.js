import React, { Component } from "react";
import { Button, Menu, Icon, Header, Dropdown, Input} from "semantic-ui-react";
import '../../Sass/nav.scss';

const options = [
  { text: "Wiiliam", value: "William" },
];  
 function ManageNav() {
  return (
    <>
      <header>
        <div className='manage-nav'>
          <div className='nav-brand'>
             <img src={process.env.PUBLIC_URL+"/Assets/Logo/brand.png"} alt='logo'/>
          </div>
          <Input icon='search' placeholder='Search'/>
          <div className="btn-group">
            {/* <Icon name='bell outline'/> */}
            <div class='dropdown-btn'>
              <Icon name='user outline'/>
                <Dropdown text='William'>
                  <Dropdown.Menu className='dropdown-menu'>
                  <li className='item-name'><Icon name='user outline'/>My Account</li>
                  <li className='item-name'><Icon name='history'/>History</li>
               <li className='item-name' style={{ color: "#000" }}><Icon name='file outline' />My Documents</li>
                  <li className='item-name'><Icon name='history'></Icon>Logout</li>
                </Dropdown.Menu>
                </Dropdown>
            </div>  
          </div>
        </div>
      </header>
    </>
  );
  }
  export default ManageNav;