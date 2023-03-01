import { useState } from 'react';

export default function ItemPrice({ type, value, onChange }) 
{
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  function handleInputChange(e) 
  {
    if (e.target.value >= 0 || type === "name")
      setInputValue(e.target.value);
  }

  function handleEdit() 
  {
    setEditing(true);
  }

  function handleSave() 
  {
    setEditing(false);
    onChange(inputValue);
  }

  function handleKeyDown(e)
  {
    if (e.key === "Enter")
      handleSave();
  }

  if (type === "name")
  {
    return (
      <div className='li-name'>
        {
          editing ? (<input style={{ width: '100%' }} autoFocus type="text" value={inputValue} onChange={handleInputChange} onBlur={handleSave} onKeyDown={handleKeyDown}/>) 
                  : (<div style={{ width: '100%' }} onClick={handleEdit}>{value}</div>)
        }
      </div>
    );
  }

  else if (type === "price")
  {
    return (
      <div className='li-price'>
        {
          editing ? (<input style={{ width: '100%' }} autoFocus type="number" value={inputValue} onChange={handleInputChange} onBlur={handleSave} onKeyDown={handleKeyDown}/>) 
                  : (<div style={{ width: '100%' }} onClick={handleEdit}>R${value}</div>)
        }
      </div>
    );
  }

  else if (type === "amount")
  {
    return (
      <div className='li-amount'>
        {
          editing ? (<input style={{ width: '100%' }} autoFocus type="number" value={inputValue} onChange={handleInputChange} onBlur={handleSave} onKeyDown={handleKeyDown}/>) 
                  : (<div style={{ width: '100%' }} onClick={handleEdit}>{value}</div>)
        }
      </div>
    );
  }
}