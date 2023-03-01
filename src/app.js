import React, { useState, useRef, useEffect } from 'react';
import { v4 } from 'uuid';
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
    let price = itemPriceRef.current.value;
    let amount = itemAmountRef.current.value;

    if (price === '') price = 0;
    if (amount === '') amount = 0;

    // creating new item and joining with previous items
    const newItem = {id: v4(), name: name, price: price, amount: amount};
    const newItems = [...listItems, newItem];
    
    // calculating total and setting new items
    sumTotal(newItems); 
    setListItems(newItems);
    
    // clearing inputs
    itemNameRef.current.value = ""; 
    itemPriceRef.current.value = ""; 
    itemAmountRef.current.value = "";
  }

  function PriceCounter()
  {
    // runs total price calc on page load 
    useEffect(() => {sumTotal(listItems);}, []); 
    return <div className='total-price'>Total: <span className='highlight'>R${Number(totalPrice).toFixed(2)}</span></div>
  }

  return (
    <div className="app">
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