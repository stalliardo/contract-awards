import React, { useState } from 'react'
import './select-menu.css';

const menuOptions = [
  {value: "Oct-23"},
  {value: "Nov-23"},
  {value: "Dec-23"},
  {value: "Jan-24"},
  {value: "Feb-24"},
  {value: "Mar-24"},
]

const MenuItem = ({ value, handleClick }) => {
  return <div className="item" onClick={handleClick}>{value}</div>
}

const SelectMenu = ({ value, label, name, handleItemSelection, menuItems, placeholder, allSettingPlaceholder = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultValue, setDefaultValue] = useState(placeholder);

  const toggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  }

  const handleMenuItemSelected = (item) => {
    setIsOpen(false);
    if(allSettingPlaceholder){
      setDefaultValue(item.value);
    }

    handleItemSelection(item);
    // TODO update table data based off of selection
    // TODO update table date / title 
  }

  return (
    <div className='select-menu'>
      <div className='placeholder-container' onClick={toggleIsOpen}>
        <p>{defaultValue}</p>
        <p><i className={`arrow down`}></i></p>
      </div>
      <div className={`select-menu-dropdown-container ${isOpen ? "open" : ""}`}>
        {
          menuItems.map((item, index) => (
            <MenuItem  value={item.value} key={index} handleClick={() => handleMenuItemSelected(item)}/>
          ))
        }
      </div>
    </div>
  )
}

export default SelectMenu