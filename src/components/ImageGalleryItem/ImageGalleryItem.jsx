import PropTypes from 'prop-types';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import { ImgGalleryItem, ImgGalleryItemImg } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <ImgGalleryItem>
      <ImgGalleryItemImg
        src={webformatURL}
        alt={tags}
        loading="lazy"
        onClick={toggleModal}
      />
      {isOpenModal && (
        <Modal
          tags={tags}
          largeImageURL={largeImageURL}
          onClose={toggleModal}
        />
      )}
    </ImgGalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  toggleModal: PropTypes.func,
  isOpenModal: PropTypes.bool,
};

export default ImageGalleryItem;
