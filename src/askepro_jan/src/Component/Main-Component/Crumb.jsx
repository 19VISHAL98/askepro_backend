import React from "react";
import '../../Sass/Sass-Main/_About.scss';
import { Breadcrumb, Container } from "semantic-ui-react";




const Crumb = ({section, file}) =>{
  return (
    <div className='crumb'>
  <Breadcrumb icon='right angle' sections ={section} href="{file}"/>
  </div>
  )
}
export default Crumb;
