
import React from 'react';

const Product = ({ name ,quanity}) => {
return <div>{name}{quanity>1?'':quanity}</div>;
};

export default Product;
