import React from 'react'
import classes from './SearchInput.module.css'
import searchIcon from '../../../assets/icons/search.svg'

const SearchInput = () => {
  return (
    <label className={classes['search-input-box']}>
      <img src={searchIcon} alt='search input' />
      <input type='text' maxLength={120} placeholder='Search through tasks' />
    </label>
  )
}

export default SearchInput