import React, { useState, useEffect } from 'react'
import './select-menu.css';

const MenuItem = ({ value, handleClick, styles }) => {
  return <div style={styles} className="item" onClick={handleClick}>{value}</div>
}

const SelectMenu = ({ value, label, name, handleItemSelection, menuItems, placeholder, allSettingPlaceholder = true, styles, dropDownContainerStyles }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultValue, setDefaultValue] = useState(placeholder);

  useEffect(() => {
    setDefaultValue(placeholder);
  }, [placeholder])

  const toggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  }

  const handleMenuItemSelected = (item) => {
    setIsOpen(false);
    if(allSettingPlaceholder){
      setDefaultValue(item.value);
    }

    handleItemSelection(item);

  }

  return (
    <div className='select-menu'>
      <div className='placeholder-container' onClick={toggleIsOpen}>
        <p>{defaultValue}</p>
        <p><i className={`arrow down`}></i></p>
      </div>
      <div className={`select-menu-dropdown-container ${isOpen ? "open" : ""}`} style={dropDownContainerStyles}>
        {
          menuItems.map((item, index) => {
            if(item.value !== defaultValue) return <MenuItem styles={styles}  value={item.value} key={index} handleClick={() => handleMenuItemSelected(item)}/>
          })
        }
      </div>
    </div>
  )
}

export default SelectMenu