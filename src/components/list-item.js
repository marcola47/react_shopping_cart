import { useContext } from 'react';
import { SumTotalContext, ListItemsContext } from '../app';

import ItemAmount from './list-item-amount';
import ItemPrice from './list-item-price';
import ItemName from './list-item-name';

import trashCan from '../img/trash.png';

export default function ListItem({ listItem })
{
  const { listItems, setListItems } = useContext(ListItemsContext);
  const sumTotal = useContext(SumTotalContext);

  function handleNameChange(newName) 
  {
    const placeholderItems = listItems.map((item) => 
    {
      if (item.id === listItem.id) 
        return { ...item, name: newName }
      
      return item;
    });

    setListItems(placeholderItems);
  }
  
  function handlePriceChange(newPrice) 
  {
    const placeholderItems = listItems.map(item => 
    {
      if (item.id === listItem.id) 
        return { ...item, price: newPrice }
      
      return item;
    });

    sumTotal(placeholderItems);
    setListItems(placeholderItems);
  }

  function handleAmountChange(newAmount) 
  {
    const placeholderItems = listItems.map(item => 
    {
      if (item.id === listItem.id) 
        return { ...item, amount: newAmount }
      
      return item;
    });

    sumTotal(placeholderItems);
    setListItems(placeholderItems);
  }
  
  function removeListItem()
  {
    setListItems((listItems) => listItems.filter((item) => item.id !== listItem.id));
  }

  return (
    <div className='li' id={listItem.id}>
      <ItemName value={listItem.name} onChange={handleNameChange}/>
      <ItemPrice value={listItem.price} onChange={handlePriceChange}/>
      <ItemAmount value={listItem.amount} onChange={handleAmountChange}/>
      <div className='li-remove' onClick={removeListItem}><img src={trashCan} alt="remove item"/></div>
    </div>
  )
}
