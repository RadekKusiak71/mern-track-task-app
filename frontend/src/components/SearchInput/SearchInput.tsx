import React from 'react';
import classes from './SearchInput.module.css';
import searchIcon from '../../assets/icons/search.svg';

interface SearchInputProps {
  handleQueryChange: React.ChangeEventHandler<HTMLInputElement>;
}

const SearchInput: React.FC<SearchInputProps> = ({ handleQueryChange }) => {
  return (
    <label className={classes['search-input-box']}>
      <img src={searchIcon} alt='search input' />
      <input onChange={handleQueryChange} type='text' maxLength={120} placeholder='Search through tasks' />
    </label>
  );
};

export default SearchInput;
