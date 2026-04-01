import { useEffect, useState } from 'react';
import { Row, Button, Figure } from 'react-bootstrap';

import { BsHandThumbsUp, BsHandThumbsUpFill } from 'react-icons/bs';
import NewSuggestion from './NewSuggestion';

const Results = (props) => {
  //PROPS
  const selected = props.selected;
  const fetchedData = props.fetchedData;
  const setSelected = props.setSelected;
  const modal = props.modal;
  const text = props.text;
  //USESTATE
  const [like, setLike] = useState(() => {const saved = localStorage.getItem('results'); return saved ? JSON.parse(saved) : [];})
  const [show, setShow] = useState(false);

  const likeIcon = () => {
    switch (like) {
      case 'true':
        return <BsHandThumbsUp />;
      case 'false':
        return <BsHandThumbsUpFill />;
      default:
        return <BsHandThumbsUp />;
    }
  };

  const handleLike = (id) => {
    // localStorage.removeItem('favourites');
    localStorage.setItem('favourites', [...like, id]);
    console.log(localStorage.favourites);
    if (like.includes(id)) {
      setLike(like.filter((itemId) => itemId !== id));
    } else {
      setLike([...like, id]);
    }
  };

  const handleFavourite = function (songId) {
    const token = localStorage.getItem('token');

    fetch(`http://localhost:3001/users/me/favourites/${songId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error while adding to Favourites.');
        }
        return response.json();
      })
      .then((update) => {
        console.log('Favourite updated.');
        return update;
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  };

  return (
    <>
      <Row
        className={`text-start align-content-start border border-1 text-white secondary-color rounded rounded-2 py-2 overflow-y-auto`}
        style={{ height: '500px' }}
      >
        <h4 className="text-start">{text}</h4>
        {fetchedData.map((data) => (
          <Row
            key={text + -+data.id}
            className={`row-cols-4 m-0 my-1 p-0 ${selected.id === data.id ? 'border border-1 border-color-primary' : ''}  rounded rounded-2 py-1`}
            onClick={(e) => {
              e.stopPropagation();
              selected !== data ? setSelected(data) : setSelected('');
            }}
          >
            {/* <img src={data.album.cover_xl} alt="album cover" className="w-25"/> */}
            <Figure className="m-0">
              <Figure.Image
                className="m-0"
                width={125}
                height={125}
                alt="album cover"
                src={data.album?.cover_medium}
              />
            </Figure>
            <div className="flex-grow-1 p-0">
              <p className="mb-1">
                <span className="fw-semibold">Artist</span> {data.artist?.name}
              </p>
              <p className="mb-1">
                <span className="fw-semibold">Song</span> {data?.title}
              </p>
              <p className="mb-1">
                <span className="fw-semibold">Album</span> {data.album?.title}
              </p>
              {!modal && (
                <Row className="row-cols-3 row-cols-md-5 justify-content-between">
                  <Button
                    className="primary-color px-0 mx-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShow(data.id);
                      console.log('Suggerisci!');
                    }}
                  >
                    {' '}
                    Suggest!{' '}
                  </Button>

                  <NewSuggestion
                    show={show}
                    setShow={setShow}
                    songId={data.id}
                  />
                  <Button
                    className="bg-transparent text-primary border border-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(data.id);
                      handleFavourite(data.id);
                    }}
                  >
                    {' '}
                    {like.includes(data.id) ? (
                      <BsHandThumbsUpFill className="transparent" />
                    ) : (
                      <BsHandThumbsUp />
                    )}
                  </Button>
                </Row>
              )}
            </div>
          </Row>
        ))}
      </Row>
    </>
  );
};

export default Results;
