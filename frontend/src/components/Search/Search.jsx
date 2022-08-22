import { IconButton, InputBase, Paper, CircularProgress } from '@mui/material';
import React from 'react';
import { OutlineCloseCircle, SearchIcon } from '../Icons';

const Search = ({
  onChangeSearch,
  focused,
  valueSearch,
  showLoading,
  placeholder,
}) => {
  const handleOnChangeSearch = (e) => {
    onChangeSearch(e.target.value);
  };
  return (
    <Paper sx={{ width: '27rem', display: 'flex' }}>
      <InputBase
        sx={{ ml: 1, flex: 1, fontSize: '1.3rem' }}
        placeholder={placeholder}
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
              <OutlineCloseCircle />
            )}
          </>
        ) : (
          <SearchIcon />
        )}
      </IconButton>
    </Paper>
  );
};

export default Search;
