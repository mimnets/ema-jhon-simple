import React from 'react';

const RviewItem = (props) => {
    const {name, quantity} = props.product;
    const reviewItemStyle = {
        borderBottom: '1px solid lightgray',
        marginBottom: '5px',
        paddingBottom: '5px',
        marginLeft: '200px'
    };
    return (
        <div style ={reviewItemStyle} className="rview-item">
            <h1>{name}</h1>
            <p>Quantity : {quantity}</p>
            <button className="main-button">Remove</button>
        </div>
    );
};

export default RviewItem;