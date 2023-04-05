import React from "react";
import './ImageLinkForm.css'
const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <div className="center">
                <p className="f3 center form">
                    {`This Magic Brain will detect faces in your pictures. Give it a try!`}
                </p>
            </div>
            <div className="center">
                <div className="form formBG center pa4 br3 shadow-5">
                    <input type={`Text`} onChange={onInputChange} className="f4 pa2 w-75 center" />
                    <button onClick={onButtonSubmit} className="w-25 grow f4 ph3 pv2 dib white bg-light-purple">Detect</button>
                </div>
            </div>
        </div>
    );
}
export default ImageLinkForm;