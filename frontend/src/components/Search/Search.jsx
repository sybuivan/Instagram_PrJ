import { IconButton, InputBase, Paper } from '@mui/material';
import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';

const Search = ({ onChangeSearch, focused, valueSearch }) => {
  const handleOnChangeSearch = (e) => {
    onChangeSearch(e.target.value);
  };
  return (
    <Paper sx={{ width: '27rem', display: 'flex' }}>
      <InputBase
        sx={{ ml: 1, flex: 1, fontSize: '1.3rem' }}
        placeholder="Search Google Maps"
        inputProps={{ 'aria-label': 'Search...' }}
        onChange={(e) => handleOnChangeSearch(e)}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        {focused && !!valueSearch ? <AiOutlineCloseCircle /> : <BsSearch />}
      </IconButton>
    </Paper>
  );
};

export default Search;
