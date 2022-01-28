import React from "react";
const Faq = () => {
    const [faq, setFaq] = React.useState(null);
    React.useEffect(() => {
        getfaq();
    }, []);

    const getfaq = async () => {
        let data = await (
            await fetch(
                `${process.env.REACT_APP_BASE_URL}/faqs`,
                {
                    method: "GET"
                })).json();
        setFaq(data);
    }
    if (!faq) {
        return faq;
    }
}

export default Faq;