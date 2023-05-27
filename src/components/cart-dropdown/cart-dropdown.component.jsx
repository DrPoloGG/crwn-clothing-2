import { useContext } from 'react';
import { useNavigate } from 'react-router';

import Button from '../button/button.component';

import { CartContext } from '../../contexts/cart.context';

import './cart-dropdown.styles.scss';
import CartItem from '../cart-item/cart-item.component';

const CartDropdown = () => {
  const { cartItems, isCartOpen, setIsCartOpen } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate('/checkout');
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
        <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>
      </div>
    </div>
  );
};

export default CartDropdown;
