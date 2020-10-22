import React from 'react';

//Pre-styled image component that allows for sizing and optional shadows
export default function ImageAvatar({ src, size, shadow }) {

    return (
        <img className={`image-avatar image-avatar--${size} ${shadow ? 'image-avatar--shadow' : ""}`} src={src} alt="" />
    )
}