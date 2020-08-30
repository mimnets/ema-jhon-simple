import React from 'react';

const RviewItem = (props) => {
    const {name, quantity, key, price} = props.product;
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
            <p><small>${price}</small></p>
            <button className="main-button"
                    onClick = {() => props.removeProduct(key)}
            >Remove</button>
        </div>
    );
};

export default RviewItem;