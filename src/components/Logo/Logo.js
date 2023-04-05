import React from "react";
import Tilt from 'react-parallax-tilt';
import './logo.css';


const Logo = () => {
    return (
        <div className="ma4" style={{top: '0px', left: '0px'}}>
            <Tilt className="Tilt br2 shadow-2" options={{max: 45}} style={{height: '120px', width: '120px'}}>
                <div className="Tilt-inner h-100 w-100 flex items-center justify-center">
                     <img src={require(`./brain-64.png`)} alt="logo" style={{height: '64px'}} />
                </div>
            </Tilt>
        </div>
    );
}
export default Logo;