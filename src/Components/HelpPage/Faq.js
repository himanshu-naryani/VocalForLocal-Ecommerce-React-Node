import React, { Component } from "react";
import Faq from 'react-faq-component';
import {MDBIcon} from 'mdbreact'
 
const data = {
    title: "Frequently Asked Questions",
    rows: [
        {
            title: "Why you should choose our website?",
            content: `An E-commerce website to sell and buy famous local products, for local sellers and street shoppers.
            `,
        },
        {
            title: "Why you should choose our website?",
            content:
                "An E-commerce website to sell and buy famous local products, for local sellers and street shoppers.",
        },
        {
            title: "Why you should choose our website?",
            content: `An E-commerce website to sell and buy famous local products, for local sellers and street shoppers. `,
        },
        {
            title: "What is the package version",
            content: <p>current version is 1.2.1</p>,
        },
    ],
};
 
const styles = {
    bgColor: '#e5e5e5',
    titleTextColor: "#0D3B66",
    rowTitleColor: "#DA3E52",
    rowContentColor: '#000000',
    arrowColor: "#DA3E52",
};
 
const config = {
    animate: true,
    arrowIcon: <MDBIcon icon="chevron-circle-down" />,
    tabFocus: true
};
 
export default class App extends Component {
    render() {
        return (
            <div>
                <Faq data={data} styles={styles} config={config} />
            </div>
        );
    }
}