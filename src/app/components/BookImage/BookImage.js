import React, {useState} from 'react';
import {getBookThumbnail} from "../../service/googleapi";
import "./BookImage.css"

function BookImage(props) {
    let [isbn, setIsbn] = useState(props.isbn),
        [title, setTitle] = useState(props.title),
        [imageSrc, setImageSrc] = useState(null);


        getBookThumbnail(isbn).then(src => {
            setImageSrc(src);
        })


    if (imageSrc) {
        return (
            <img src={imageSrc} alt={title}/>
        );
    } else {
        return (
            <div className="imageContainer">
                <div className="imageSpinner d-flex justify-content-center">
                    <div className="spinner-border d-flex justify-content-center" role="status">
                    </div>
                </div>
            </div>)
    }
}

export default BookImage;

