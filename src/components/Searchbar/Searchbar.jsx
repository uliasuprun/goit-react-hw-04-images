import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import {
  HeaderSearch,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchFormInput,
} from './Searchbar.styled';

const Searchbar = ({onSubmit}) => {
  const [searchName, setSearchName] = useState('');

  const handleFormChange = event => {
    setSearchName(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchName.trim() === '') {
      return toast.error('Write search name');
    }
    onSubmit(searchName);
    setSearchName('');
  };

  return (
    <HeaderSearch>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormBtn type="submit">
          <ImSearch />
          <SearchFormBtnLabel>Search</SearchFormBtnLabel>
        </SearchFormBtn>

        <SearchFormInput
          type="text"
          name="searchName"
          value={searchName}
          onChange={handleFormChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </HeaderSearch>
  );
};

Searchbar.propTypes = {
  searchName: PropTypes.string,
  handleFormChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default Searchbar;