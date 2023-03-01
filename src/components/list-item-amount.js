import { useState } from 'react';

export default function ItemAmount({ value, onChange }) 
{
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  function handleInputChange(e) 
  {
    if (e.target.value >= 0)
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

  return (
    <>
      {
        editing ? (<input autoFocus type="number" value={inputValue} onChange={handleInputChange} onBlur={handleSave} onKeyDown={handleKeyDown}/>)  
                : (<div onClick={handleEdit}>{value}</div>)
      }
    </>
  );
}