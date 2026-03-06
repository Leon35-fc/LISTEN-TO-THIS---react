import { useEffect, useRef, useState } from 'react';
import {
  Form,
  Container,
  Card,
  Row,
  Col,
  ProgressBar,
  Button
} from 'react-bootstrap';
import { BsFillPlayFill } from 'react-icons/bs';
import { BsFillStopFill } from 'react-icons/bs';
import { BsFillSkipBackwardFill } from 'react-icons/bs';
import { BsFillSkipForwardFill } from 'react-icons/bs';

const CenterContent = () => {
  const searchURL =
    'https://striveschool-api.herokuapp.com/api/deezer/search?q=';
  const [inputForm, setInputForm] = useState('');
  const [fetchedData, setFetchedData] = useState([]);
  const [selected, setSelected] = useState('');
  const [audioPlaying, setAudioPlaying] = useState();
  const audioRef = useRef(null);

  const deezerFetch = function (input) {
    if (!input || input == 'undefined') return;
    console.log('from fetch', input);

    fetch(searchURL + input)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Errore nel recupero dei dati.');
        }
      })
      .then((data) => {
        console.log(data);

        setFetchedData(data.data);
      })
      .catch((error) => {
        console.log('Errore.', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    deezerFetch(inputForm.replaceAll(' ', '+'));
    setInputForm('');
  };

  useEffect(() => {
    play();
  }, [selected]);

  const play = () => {
    if (audioPlaying) {
      audioPlaying.pause();
      // audioPlaying.currentTime = 0;
      setAudioPlaying((audioPlaying.src = ''));
    }

    if (audioPlaying === selected) {
      audioPlaying;
    }

    const newSource = new Audio(selected.preview);
    newSource.play();
    setAudioPlaying(newSource);
  };

  const stop = () => {
    audioPlaying.pause();
    audioRef.current.pause();
    audioRef.current.currentTime = 0; // Resetta l'audio all'inizio
    setAudioPlaying('');
  };

  const handleTimeUpdate = () => {
    const current = audioRef.current.currentTime;
    const total = audioRef.current.duration;
    setProgress((current / total) * 100);
  };

  const changeSong = (index) => {
    //index of the current selected song from the fatch
    const currentSongIndex = fetchedData.indexOf(selected);
    const nextSong = (currentSongIndex + index) % fetchedData.length;
    audioPlaying.pause();
    console.log(selected);
    setAudioPlaying(fetchedData[nextSong]);
    setSelected(fetchedData[nextSong]);
    audioPlaying.pause();
    play();
  };

  return (
    <>
      <div className="border border-2 border-black my-3 p-2">
        <p>CENTER CONTENT</p>
        <Container>
          {/* CARD/PLAYER */}
          <Row className="my-3">
            <Card className="d-flex align-items-center">
              <Card.Img
                variant="top"
                src={
                  !selected
                    ? 'https://placehold.co/400/'
                    : selected.album.cover_xl
                }
                className="w-50"
              />
              <Card.Body className="w-100">
                <Card.Title className="d-flex align-content-start">
                  {!selected ? 'Song Title' : selected.title}
                </Card.Title>
                <Card.Text className="d-flex align-content-start">
                  {!selected ? 'Artist' : selected.artist.name}
                </Card.Text>
                <div className="d-flex">
                  <div className="d-flex justify-content-start gap-1 me-auto">
                    <Button onClick={() => changeSong(-1)}>
                      <BsFillSkipBackwardFill />
                    </Button>
                    <Button onClick={() => play()}>
                      <BsFillPlayFill />
                    </Button>
                    <Button onClick={() => stop()}>
                      <BsFillStopFill />
                    </Button>
                    <Button onClick={() => changeSong(1)}>
                      <BsFillSkipForwardFill />
                    </Button>
                  </div>
                  <ProgressBar
                    now="20"
                    className="flex-grow-1 ms-1"
                    onChange={handleTimeUpdate}
                  />
                </div>
                <div>
                  <ProgressBar now="20" className="flex-grow-1 my-2" />
                </div>
              </Card.Body>
            </Card>
          </Row>

          {/* SEARCHBAR */}
          <Row className="my-1">
            <Form className="p-0" onSubmit={handleSubmit}>
              <Form.Control
                type="text"
                placeholder="Search arstist or song"
                value={inputForm}
                onChange={(e) => setInputForm(e.target.value)}
              />
            </Form>
          </Row>

          {fetchedData && (
            <Container className="p-0 m-0">
              {/* RISULTATI RICERCA */}
              <Row className="text-start border border-1 bg-info-subtle rounded rounded-2">
                <h4>Results</h4>
                {fetchedData.map((data) => (
                  <Row
                    key={data.id}
                    className={`row-cols-3 m-0 my-1 p-0 ${selected.id === data.id ? 'border border-1 border-dark' : ''}  rounded rounded-2`}
                    onClick={() =>
                      selected !== data ? setSelected(data) : setSelected('')
                    }
                  >
                    <img src={data.album.cover_xl} alt="" className="" />
                    <div className="flex-grow-1">
                      <p>
                        <span className="fw-semibold">Artist</span>{' '}
                        {data.artist.name}
                      </p>
                      <p>
                        <span className="fw-semibold">Album</span>{' '}
                        {data.album.title}
                      </p>
                      <p>
                        <span className="fw-semibold">Song</span> {data.title}
                      </p>
                    </div>
                  </Row>
                ))}
              </Row>
            </Container>
          )}
        </Container>
      </div>
    </>
  );
};

export default CenterContent;
