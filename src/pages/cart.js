import { Link} from 'gatsby';
import CartContext from '../context/CartContext';
import React, { useContext } from 'react';


import Brand from '../components/Brand';
import CartItem from '../components/CartItem';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Icon from '../components/Icons/Icon';
import OrderSummary from '../components/OrderSummary/OrderSummary';
import * as styles from './cart.module.css';

const CartPage = (props) => {
  const context = useContext(CartContext);
  const state = context?.state || { totalCost: 0, items: [] };
  const { items, totalCost } = state;
  //  size={state.sizeOptions} type={state.typeOptions} quantity={state.quantity}  

  const itemNames = items.map(item => item.name); 
  const itemSize = items.map(item => item.sizeOptions); 
  const itemType = items.map(item => item.typeOptions); 
  const itemQuantity = items.map(item => item.quantity); 



  return (
    <div>
      <div className={styles.contentContainer}>
        <Container size={'large'} spacing={'min'}>
          <div className={styles.headerContainer}>
            <div className={styles.shoppingContainer}>
              <Link className={styles.shopLink} to={'/'}>
              
                <span className={styles.continueShopping}>
                  Continue Shopping
                </span>
              </Link>
            </div>
            <Brand />
            {/* <div className={styles.loginContainer}>
              <Link to={'/login'}>Login</Link>
            </div> */}
          </div>
          <div className={styles.summaryContainer}>
            <h3>My Bag</h3>
            <div className={styles.cartContainer}>
              <div className={styles.cartItemsContainer}>
                {items.map(item => (
                  <CartItem key={item.id} {...item} />
                ))}
              </div>
              <OrderSummary
  itemSize={itemSize}
  itemQuantity={itemQuantity}
  itemType={itemType}
  itemNames={itemNames}
  totalCost={state.totalCost + 45} // Add 100 rupees as delivery charge
  subtotal= {state.totalCost}
/>

            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;

