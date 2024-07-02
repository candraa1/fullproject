import React from 'react';
import PropTypes from 'prop-types';

const ProductItem = ({ name, price }) => {
    return(
        <div>
            <h2>{name}</h2>
            <p>Price: ${price}</p>
        </div>
    )
}

// Validasi tipe props
ProductItem.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
};

export default ProductItem;