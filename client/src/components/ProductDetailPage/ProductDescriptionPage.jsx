import React from 'react';

const ProductDescriptionPage = () => {
    const product = {
        "_id": "648052cb649dee201c515695",
        "name": "online photo",
        "description": "sdlfkajfa",
        "price": 123,
        "categories": [],
        "seasons": [],
        "photo": "/1686131403714-153165324.jpg",
        "isVerified": true,
        "seller": {
            "_id": "647b711c59c1ed182ff70640",
            "username": "admin",
            "email": "admin@gmail.com",
            "password": "U2FsdGVkX18F4Kze1kUSn20dLNy+ywI6bLl6XhMYpeo=",
            "isAdmin": true,
            "createdAt": "2023-06-03T16:58:04.254Z",
            "updatedAt": "2023-06-03T16:58:04.254Z",
            "__v": 0
        },
        "payement_completed": false
    };

    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Seller: {product.seller.username}</p>
            <img src={product.photo} alt={product.name} />
            <p>Payment Status: {product.payement_completed ? 'Completed' : 'Pending'}</p>
        </div>
    );
};

export default ProductDescriptionPage;
