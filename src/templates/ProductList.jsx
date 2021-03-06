import { Add } from '@material-ui/icons';
import { push } from 'connected-react-router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductCard } from '../components/Products';
import { fetchProducts } from '../reducks/products/operations';
import { getProducts } from '../reducks/products/selectors';

const ProductList = () => {
  // redux thunk のoperationファイルで定義する関数をdispatchしたいので
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const products = getProducts(selector);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []); // ComponentDidMountと同等

  return (
    <section className='c-section-wrapin'>
      <div className='p-grid__row'>
        {products.length > 0 &&
          products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              images={product.images}
              price={product.price}
            />
          ))}
      </div>
      <div>
        <Add onClick={() => dispatch(push('/product/edit'))}></Add>
      </div>
    </section>
  );
};
export default ProductList;
