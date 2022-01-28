import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { Step } from 'semantic-ui-react';
import '../../Sass/app.scss';


const Stepper = () => {
    let arr, titleArr
    const location = useLocation();
    const [result, setResult] = React.useState(null);
    if (localStorage.getItem("mode") === 'Online') {

        arr = ["/fill", "/upload", "/payment"];
        titleArr = ["Fill Details", "Upload Documents", "Payment"];
    }
    else if (localStorage.getItem("mode") === 'Offline') {
        arr = ["/fill", "/book", "/payment"];
        titleArr = ["Fill Details", "Book an appointment", "Payment"];
    }
    else {
        arr = ["/fill", "/mode", "/", "/payment"];
        titleArr = ["Fill Details", "Choose a Mode", "Upload Documents/Book an appointment", "Choose Mode"];
    }
    React.useEffect(() => {
        let final = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === location.pathname) {
                final.push({ title: titleArr[i], status: true });

            }
            else {
                final.push({ title: titleArr[i], status: false });
            }
        }

        setResult(final);
    }, []);
    if (!result) {
        return (<div></div>);
    }
    return (
        <div className="stepper">
            <Step.Group size='tiny' stackable='tablet' widths="6">
                {result.map((ele, index) => (
                    <Step active={ele.status} >
                        <Step.Content>
                            <Step.Title>{index + 1}</Step.Title>
                            <Step.Description>{ele.title}</Step.Description>
                        </Step.Content>

                    </Step>))}

            </Step.Group>
        </div>
    )
}
export default Stepper;