import './CategoriesPreview.scss';

import { useContext, Fragment } from 'react';
import CategoryPreview from '../../components/categories-preview/CategoryPreview';
import { ProductContext } from '../../context/productContext';

function CategoriesPreview() {
  const { products } = useContext(ProductContext);
  return (
    <Fragment>
      {Object.keys(products).map(title => {
        const products2h = products[title];
        return (
          <CategoryPreview key={title} title={title} products={products2h} />
        );
      })}
    </Fragment>
  );
}
export default CategoriesPreview;
