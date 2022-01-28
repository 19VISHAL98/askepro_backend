import React from 'react';
import {Sidebar, Header, Icon, Menu, Segment, Image} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import '../../Sass/nav.scss';
const SideBar = ({value, active}) => {
return (
    <div className='sidebar'
      as={Menu}
      animation='overlay'
      icon='labeled'
      inverted
      vertical
      visible
      width='thin'  
    >
      <Menu.Item as='a'  className={value==='dashboard' ? active : ""}>
      <Link to='/admin'><span className='tool_name'>Dashboard</span><img src={process.env.PUBLIC_URL + '/Assets/images/grid.svg'}/></Link>
      </Menu.Item>
      <Menu.Item as='a' className={value==='application' ? active : ""}>
      <Link to='/admin/application'><span className='tool_name'>Application</span><img src={process.env.PUBLIC_URL + '/Assets/images/file-text.svg'}/></Link>
      </Menu.Item>
      <Menu.Item as='a' className={value==='client' ? active : ""}>
      <Link to='/admin/clients'><span className='tool_name'>Clients</span><img src={process.env.PUBLIC_URL + '/Assets/images/users.svg'} /></Link>
      </Menu.Item>
      <Menu.Item as='a' className={value==='appointment' ? active : ""}>
      <Link to='/admin/appointment'> <span className='tool_name'>Appointment</span><img src={process.env.PUBLIC_URL + '/Assets/images/calendar.svg'} /></Link>
      </Menu.Item>
      <Menu.Item as='a' className={value==='payment' ? active : ""}>
      <Link to='/admin/payments'><span className='tool_name'>Payments</span><img src={process.env.PUBLIC_URL + '/Assets/images/credit-card.svg'} /></Link>
      </Menu.Item>
      <Menu.Item as='a'  className={value==='service' ? active : ""}>
      <Link to='/admin/service'><span className='tool_name'>Service</span><img src={process.env.PUBLIC_URL + '/Assets/images/settings.svg'}/></Link>
      </Menu.Item>
      <Menu.Item as='a'  className={value==='faq' ? active : ""}>
      <Link to='/admin/faq'><span className='tool_name'>FAQ</span><img src={process.env.PUBLIC_URL + '/Assets/images/faq.png'}/></Link>
      </Menu.Item>
      <Menu.Item as='a'  className={value==='offer' ? active : ""}>
      <Link to='/admin/offer'><span className='tool_name'>Offer</span><img src={process.env.PUBLIC_URL + '/Assets/images/discount.png'}/></Link>
      </Menu.Item>
      <Menu.Item as='a'  className={value==='query' ? active : ""}>
      <Link to='/admin/query'><span className='tool_name'>Query</span><img src={process.env.PUBLIC_URL + '/Assets/images/mail.svg'}/></Link>
      </Menu.Item>
      {/* <Menu.Item as='a'  className={value==='help' ? active : ""}>
      <Link to='/admin/query'><img src={process.env.PUBLIC_URL + '/Assets/images/help-circle.svg'}/></Link>
      </Menu.Item> */}
      
    </div>
    );
}

export default SideBar;