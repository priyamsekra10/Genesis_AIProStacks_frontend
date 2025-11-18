import React from 'react';
import * as styles from './ProductCollectionGrid.module.css';

import ProductCollection from '../ProductCollection';

const ProductCollectionGrid = (props) => {
  return (
    <div className={styles.root}>
      <ProductCollection
        image={'/collections/collection1.png'}

        text={'SHOP NOW'}
        link={'/shoptshirt'}
      />
      
      <ProductCollection
        image={'/collections/collection2.png'}

        text={'SHOP NOW'}
        link={'/shop'}
      />
      <ProductCollection
        image={'/collections/sticker.jpeg'}

        text={'SHOP NOW'}
        link={'/shopsticker'}
      />
    </div>
  );
};

export default ProductCollectionGrid;
