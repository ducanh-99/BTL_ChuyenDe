import React, {Component} from "react";

import { Form, Input, Button, Checkbox } from 'antd';
const { TextArea } = Input;

class Contact extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render(){
        const {

        } = this.state;
        return (
            <div id="lien-he" className="block contactBlock">
                <div className="container-fluid">
                    <div className="titleHolder">
                        <h2>Liên hệ chúng tôi ở</h2>
                    </div>
                   <div className="map">
                       <iframe
                           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.6763231528457!2d105.84126381522677!3d21.005607993943478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac76ccab6dd7%3A0x55e92a5b07a97d03!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBCw6FjaCBraG9hIEjDoCBO4buZaQ!5e0!3m2!1svi!2s!4v1607914475727!5m2!1svi!2s"
                           width="600"
                           height="450"
                           frameBorder="0"
                           style={{
                               border : 0,
                               width: '100%'
                           }}
                           allowFullScreen=""
                           aria-hidden="false" tabIndex="0" />
                   </div>
                </div>
            </div>
        );
    }
}


export default Contact;
