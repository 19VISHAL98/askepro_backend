import React from 'react';
import {Label} from 'semantic-ui-react';
import '../../Sass/app.scss';

const StatusChip  = ({value})=>{
    return (
    <Label as='a' className={value}>{value}</Label>
    )
}

export default StatusChip;