import React from "react";
import './../assets/css/menu.css';
class LoadingAction extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <div className="mainBackground">
                <div className="backgroundContent">
                    Đang tải dữ liệu
                </div>
            </div>
        );
    }

}

export default LoadingAction;