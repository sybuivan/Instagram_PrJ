import { IconButton, InputBase, Paper, CircularProgress } from '@mui/material';
import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';

const Search = ({ onChangeSearch, focused, valueSearch, showLoading }) => {
  console.log(showLoading);
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
        {focused && !!valueSearch ? (
          <>
            {showLoading ? (
              <CircularProgress
                sx={{ width: '2rem!important', height: '2rem!important' }}
              />
            ) : (
              <AiOutlineCloseCircle />
            )}
          </>
        ) : (
          <BsSearch />
        )}
      </IconButton>
    </Paper>
  );
};

export default Search;
