import React, { Component } from "react";
import { Menu, Segment,Button, Container } from "semantic-ui-react";
import '../../Sass/Sass-Main/_header.scss';

export default class MenuExampleBasic extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <>
        
      <header className="top_header">
      <Container>"
        {/* <Menu secondary > 
      
        <a href="#">
         <img src={process.env.PUBLIC_URL + '/Assets/images/Epro Logo_Web.png'} />;
        </a>
          <Menu.Menu position="right">
            <div className="Item"
              name="Home"
              active={activeItem === "Home"}
              onClick={this.handleItemClick}
            >
              Home
            </div>

            <div className="Item"
              name="Service"
              active={activeItem === "Services"}
              onClick={this.handleItemClick}
            >
             Services
            </div>

            <div className="Item"
              name="About"
              active={activeItem === "About"}
              onClick={this.handleItemClick}
            >
            About
            </div>

            <div className="Item"
              name="Contact"
              active={activeItem === "Contact"}
              onClick={this.handleItemClick}
            >
            Contact
            </div>
          </Menu.Menu> */}

          <Menu.Menu position="right">
          <div className="Btn-Item">
          <button className="same-btn"> LOGIN</button> 
            </div>
          <div className="Btn-Item">
          <button className="s-btn">
              APPLY NOW
             </button>
             
            </div>
          </Menu.Menu>         
        </Container>
        </header>
        
     </>
    );
  }
}
