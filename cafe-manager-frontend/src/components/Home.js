import React, {Component} from "react";

import About from "./Home/About";
import Contact from "./Home/Contact";
import Feature from "./Home/Feature";
import Hero from "./Home/Hero";
class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
        }

    }

    render(){
        const {classes} = this.props;
        return (
            <div className="main">
                <Hero />
                <About />
                <Feature />
                <Contact />
            </div>
        );
    }
}


export default Home;
