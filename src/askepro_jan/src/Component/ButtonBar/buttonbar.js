import React from 'react';
import { Button } from 'semantic-ui-react';
import '../../Sass/app.scss';
import { useHistory, useLocation } from 'react-router-dom';
const ButtonBar = () => {
    const location = useLocation();
    const history = useHistory();
    const [prevPath, setPrevPath] = React.useState(null);
    const [nextPath, setNextPath] = React.useState(null);
    const arr = ["/upload", "/book", "/payment", "/"]

    React.useEffect(() => {

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === location.pathname) {
                setPrevPath(arr[i - 1]);
                setNextPath(arr[i + 1]);
            }
        }

    },[]);

    return (
        <div className="button-group">
            <Button size='big' onClick={() => history.push(prevPath)} >Prev</Button>
            <Button size='big' onClick={() => history.push(nextPath)}>Next</Button>
        </div>
    )
}
export default ButtonBar;