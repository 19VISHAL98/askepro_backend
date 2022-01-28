import React from 'react'
import {Breadcrumb} from 'semantic-ui-react';
import '../Breadcrumb/breadcrumb.scss';

const BreadCrumbs = ({section}) =>{
    return (
    <Breadcrumb icon='right angle' sections ={section} />
    )
}

export default BreadCrumbs;