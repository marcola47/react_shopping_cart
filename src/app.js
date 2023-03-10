import React, { useState, useRef, useEffect } from 'react';
import { v4 } from 'uuid';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './css/app.css';

import ShoppingList from './components/list';

export const ListItemsContext = React.createContext();
export const SumTotalContext = React.createContext();

export default function App() 
{
  // creating reffs and states
  const itemNameRef = useRef(), itemPriceRef = useRef(), itemAmountRef = useRef();
  const [totalPrice, setTotalPrice] = useState();
  const [listItems, setListItems] = useState([]);

  function sumTotal(items) 
  {
    let total = 0;
    items.forEach(item => {total += item.amount * item.price;})
    setTotalPrice(total);
  }

  function addListItem()
  {
    // getting inputs from ref
    let name = itemNameRef.current.value;
    if (name === '') name = "nameless product";

    let price = itemPriceRef.current.value;
    if (price === '') price = 0;

    let amount = itemAmountRef.current.value;
    if (amount === '') amount = 0;
    
    const newItem = {id: v4(), name: name, price: price, amount: amount};
    const newItems = [...listItems, newItem];
    sumTotal(newItems); 
    setListItems(newItems);
    
    itemNameRef.current.value = ""; 
    itemPriceRef.current.value = ""; 
    itemAmountRef.current.value = "";
  }

  function PriceCounter()
  {
    // runs total price calc on page load and whenever there is any change
    useEffect(() => {sumTotal(listItems);}, []); 
    
    if (listItems.length > 0)
      return <div className='total-price'>Total: <span className='highlight'>R${Number(totalPrice).toFixed(2)}</span></div>
  }
  
  return (
    <div className="app">
      <div className='app-title'><h1>SHOPPING CART</h1><FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon></div>
      
      <div className='inputs'>
        <input id='input-name' ref={itemNameRef} type="text" placeholder='Name of the product'/>
        <input id='input-price' className='input-value' ref={itemPriceRef} type="number" placeholder='R$' step="any"/>
        <input id='input-amount' className='input-value' ref={itemAmountRef} type="number" placeholder='#' step="any"/>
        <button id='input-submit' onClick={addListItem}>ADD ITEM</button> 
      </div>

      <div className='container'>
        <PriceCounter/>
        
        <ListItemsContext.Provider value={{listItems, setListItems}}>
          <SumTotalContext.Provider value={sumTotal}>
            <ShoppingList listItems={listItems}/>
          </SumTotalContext.Provider>
        </ListItemsContext.Provider>
      </div>
    </div>
  );
}