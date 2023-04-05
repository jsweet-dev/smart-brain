import React from "react";
import './FacialRecognition.css';


const FacialRecognition = ({ imgUrl, faceData }) => {
    return (
        <div className="center ma" style={imgUrl ? {} : {display: "none"}}>
            <div className="absolute mt2">
                <img style={{width: "500px", height: "auto"}} id="inputImage" src={imgUrl} alt="output"/>
                {
                    faceData ?
                    faceData.map(faceBox => {
                        const width =  document.getElementById('inputImage').width;
                        const height =  document.getElementById('inputImage').height;
                        const top_row = faceBox.region_info.bounding_box.top_row * height;
                        const left_column = faceBox.region_info.bounding_box.left_col * width;
                        const right_column = width - (faceBox.region_info.bounding_box.right_col * width);
                        const bottom_row = height - (faceBox.region_info.bounding_box.bottom_row * height);
                        // console.log(faceBox);
                        // console.log(`This boxes values should be ${top_row}, ${left_column}, ${right_column}, ${bottom_row}`)
                        return (
                        <div key={faceBox.id} className="bounding-box" style={{top: top_row, left: left_column, right: right_column, bottom: bottom_row}}></div>
                        );
                    })
                    : 
                    ""
                }
            </div>
        </div>
    );
}

export default FacialRecognition;