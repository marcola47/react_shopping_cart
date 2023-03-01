import React from 'react';
import ListItem from './list-item';

function ItemsList({ listItems })
{
  return listItems.map(listItem => {return <ListItem listItem={listItem} key={listItem.id}/>})
}

export default function ShoppingList({ listItems })
{
  return (
    <div className='list-wrapper'>
      <ItemsList listItems={listItems}/>
    </div>
  )
}