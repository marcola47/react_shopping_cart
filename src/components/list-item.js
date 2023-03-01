import { useContext } from 'react';
import { SumTotalContext, ListItemsContext } from '../app';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

import ListItemParameter from './list-item-parameter';

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
      <ListItemParameter type="name" value={listItem.name} onChange={handleNameChange}/>
      <ListItemParameter type="price" value={listItem.price} onChange={handlePriceChange}/>
      <ListItemParameter type="amount" value={listItem.amount} onChange={handleAmountChange}/>
      <div className='li-remove' onClick={removeListItem}><FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon></div>
    </div>
  )
}
