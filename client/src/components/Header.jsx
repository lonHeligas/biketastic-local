import { useState, useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GiMagnifyingGlass } from "react-icons/gi";
import { RxAvatar } from "react-icons/rx";
import { BiTrashAlt } from 'react-icons/bi';
import { Button } from "react-bootstrap";
import { useAppCtx } from "../utils/AppContext";

const Header = () => {
  const [cartQuantity, setCartQuantity] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const { user, cartItems, setCartItems, logout } = useAppCtx();


  const deleteCartItem = (item) => {
    const updatedCart = cartItems.filter((product) => product.stripe_id !== item.stripe_id);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  }

  const handleCartTotals = () => {
    let quantity = 0;
    let total = 0;
    cartItems.map( item => {
      quantity += parseInt(item.quantity);
      total += item.price;
      return null;
    });

    setCartQuantity(quantity);
    setCartTotal(total.toFixed(2));
  }

  useEffect(() => {
    handleCartTotals();
  }, [cartItems]);

  if (!cartItems) <p>Loading...</p>

  return (
    <header>
      <nav className='navbar navbar-expand-lg '>
        <div className='container-fluid px-4 '>
          <div className='col-2'>
            <a href='/'>
              <img src='/img/biketastic_logo.png' className='logo' alt="Biketastic logo"/>
            </a>
          </div>
          <div className='search-bar col-2'>
            <form className='d-flex' role='search'>
              <input
                className='form-control me-2'
                type='search'
                placeholder='Search'
                aria-label='Search'
              />
              <button className='btn btn-outline-light' type='submit'>
                <GiMagnifyingGlass />
              </button>
            </form>
          </div>
          <div className='mx-2 col-2 d-flex justify-content-end menu-icons'>
            <ul className='navbar-nav navbar-items'>
              <li className='nav-item dropdown'> 
                <a
                  className='nav-link dropdown-toggle'                  
                  href='#'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'   
                >
                  <RxAvatar size={32} className='avatar' />
                </a>
                <ul
                  className='dropdown-menu'
                  style={{
                    left: "auto",
                    right: 0,
                    width: "100px",
                    textAlign: "center",                    
                  }}                 
                >
                  {!user ? (
                    <li>
                      <a href='/login'>Login</a>
                    </li>
                  ) : (
                    <>
                      <li>
                        <a className='dropdown-item' href='/profile'>
                          Profile
                        </a>
                      </li>
                      <li>
                        <a className='dropdown-item' href='/' onClick={logout}>
                          Sign Out
                        </a>
                      </li>
                    </>
                  )}
                </ul>
              </li>
              <li className='nav-item dropdown'>
                <a
                  className='nav-link dropdown-toggle'
                  href='#'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'   
                >
                  <div className='cart'>
                    <span className='count'>{cartQuantity}</span>
                    <AiOutlineShoppingCart
                      size={24}
                      className='shopping-cart'
                    />
                  </div>
                </a>
                <div
                  className='dropdown-menu drop-menu-start cart-menu'
                  style={{ left: "auto", right: 0, width: "500px" }}                  
                >
                  <ul>
                    {cartItems.length === 0 ? (
                      <p>Your cart is empty</p>
                    ) : (
                      cartItems.map((item) => {
                        return (
                          <>
                            <li className='d-flex justify-content-between me-3' key={item.stripe_id}>
                              <div className="col-6">
                                <p>{item.title}</p>
                                <p>Quantity: {item.quantity}</p>
                              </div>
                              <div className="d-flex flex-column align-items-center col-2">
                                <p>${item.price.toFixed(2)}</p>
                                <button type="button" className="btn btn-danger col-8" onClick={() => deleteCartItem(item)}><BiTrashAlt/></button>
                              </div>
                            </li>
                            <hr />
                          </>
                        );
                      })
                    )}
                  </ul>

                  <form
                    action='/api/checkout'
                    method='POST'
                    className='text-center'
                  >
                    <input
                      type={'hidden'}
                      name={'user_id'}
                      value={ user ? user._id : null}
                    />
                    {cartItems.map((item) => {
                      return (
                        <>
                          <input
                            type={"hidden"}
                            name={"Price[]"}
                            key={item.stripe_id}
                            value={item.stripe_id}
                          />
                          <input
                            type={"hidden"}
                            name={"Quantity[]"}
                            value={item.quantity}
                          />
                        </>
                      );
                    })}
                    <Button
                      type='submit'
                      className='btn-danger w-50 cart-button'
                    >
                      Checkout
                    </Button>
                    <p>Sub-total: {`$${cartTotal}`}</p>
                  </form>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
