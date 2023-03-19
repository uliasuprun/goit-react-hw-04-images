import toast, { Toaster } from 'react-hot-toast';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import { MainWrapper } from './App.styled';


import { useState, useEffect} from 'react';

import { fetchImgGallery } from '../api/api';



const App = () => {
  const [images, setImages] = useState([]);
  const [nameRequest, setNameRequest] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(null);


// class App extends Component {
//   state = {
//     images: [],
//     nameRequest: '',
//     page: 1,
//     isLoading: false,
//     error: null,
//     totalHits: null,
//   };

const getSearchNameForm = searchName => {
  setNameRequest(searchName);
  setPage(1);
  setImages([]);
  setTotalHits(null);
};

  // getSearchNameForm = searchName => {
  //   this.setState({
  //     nameRequest: searchName,
  //     page: 1,
  //     images: [],
  //     totalHits: null,
  //   });
  // };

  useEffect(() => {
    const controller = new AbortController();
    if (nameRequest === '') {
      return;
    }

    async function getImgGallery() {
      setIsLoading(true);
      try {
        const imgGallery = await fetchImgGallery(nameRequest, page, controller);

        const arrImages = imgGallery.hits.map(
          ({ id, webformatURL, tags, largeImageURL }) => ({
            id,
            webformatURL,
            tags,
            largeImageURL,
          })
        );

        if (imgGallery.totalHits === 0) {
          return toast.error('Sorry, didn`t find, try another');
        }
        if (page >= 2) {
          return (
            setImages(images => [...images, ...arrImages]),
            setTotalHits(imgGallery.totalHits)
          );
        }
        setImages(arrImages);
        setTotalHits(imgGallery.totalHits);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getImgGallery();
    return () => {
      controller.abort();
    };
  }, [nameRequest, page]);

  const loadMore = () => {
    setPage(page => page + 1);
  };

  // loadMore = () => {
  //   this.setState(prevState => ({
  //     page: prevState.page + 1,
  //   }));
  // };

  const showBtnLoadMore = () => {
    const ShowBtn = totalHits - page * 12;
    if (ShowBtn > 0 && !isLoading) {
      return true;
    }
    return false;
  };


  return (
    <MainWrapper>
      <Searchbar onSubmit={getSearchNameForm} />

      {totalHits > 0 ? <ImageGallery foundImages={images} /> : null}
      {isLoading && <Loader />}
      {showBtnLoadMore() && <Button loadMore={loadMore} />}
      <Toaster position="top-right" reverseOrder={false} />
    </MainWrapper>
  );
};


export default App;