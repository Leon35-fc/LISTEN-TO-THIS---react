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
import {
  BsFillPlayFill,
  BsFillStopFill,
  BsFillSkipBackwardFill,
  BsFillSkipForwardFill,
  BsFillPauseFill,
  BsFillVolumeMuteFill,
  BsFillVolumeOffFill,
  BsFillVolumeDownFill,
  BsFillVolumeUpFill
} from 'react-icons/bs';

const CenterContent = () => {
  const searchURL =
    'https://striveschool-api.herokuapp.com/api/deezer/search?q=';
  const [inputForm, setInputForm] = useState('');
  const [fetchedData, setFetchedData] = useState([]);
  //FETCHED ELEMENTS
  const [selected, setSelected] = useState('');
  //AUDIO
  const [isPlaying, setIsPlaying] = useState();
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  //VOLUME
  const [slider, setSliderValue] = useState(50);
  const [sliderPrev, setSliderPrevValue] = useState();
  const [mute, setMute] = useState(false);

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

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Resetta l'audio all'inizio
      setIsPlaying(false);
    }
  };

  const changeSong = (direction) => {
    //index of the current selected song from the fatch
    const currentSongIndex = fetchedData.findIndex(
      (song) => song.id === selected.id
    );
    let nextSong = (currentSongIndex + direction) % fetchedData.length;

    if (nextSong < 0) {
      nextSong = fetchedData.length - 1;
    }
    console.log(selected);
    setSelected(fetchedData[nextSong]);
  };

  const handleTimeUpdate = () => {
    const current = audioRef.current.currentTime;
    // console.log('CURRENT TIME: ', current);
    const total = audioRef.current.duration;
    // console.log('TOTAL TIME: ', total);
    setProgress((current / total) * 100);
  };

  const handleTimeSkip = (e) => {
    const box = e.currentTarget;
    const rect = box.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const duration = audioRef.current.duration;
    audioRef.current.currentTime = percentage * duration;
  };

  const handleVolume = function (e) {
    console.log(e.target.value);
    console.log(slider * 0.01);
    setSliderValue((e.target.value));
    let a = slider * 0.001
    console.log("A: ",a);
    if( a < 0.04 || a > 0.96){
      a = Math.floor(a)
    }
    audioRef.current.volume = a
  };

  const handleMute = function (e) {
    console.log(e.target);
    const rangeSlider = document.querySelector('.form-range');
    console.log('Il rangeSlider', rangeSlider.value);
    if (mute && slider == 0) {
      console.log('Slider prima di cambio parametri', slider);

      setMute(false);
      setSliderValue(sliderPrev);
      rangeSlider.value = sliderPrev;
      console.log("I'm on", sliderPrev);
      audioRef.current.volume = slider;
    } else {
      setSliderPrevValue(slider);
      setMute(true);
      setSliderValue(0);
      console.log("I'm mute ", sliderPrev);
      audioRef.current.volume = 0;
    }
  };

  const volumeIcon = function (a) {
    a = Math.ceil(slider / 34);
    // console.log( 'A vale: ',a)
    switch (a) {
      case 0:
        return <BsFillVolumeMuteFill />;
      case 1:
        return <BsFillVolumeOffFill />;
      case 2:
        return <BsFillVolumeDownFill />;
      case 3:
        return <BsFillVolumeUpFill />;
    }
  };

  useEffect(() => play(), [selected]);

  useEffect(() => setIsPlaying(false), []);

  return (
    <>
      <div className="border border-2 border-black my-3 p-2">
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
                className="w-50 mt-2"
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
                    <Button
                      onClick={() => {
                        isPlaying ? pause() : play();
                      }}
                    >
                      {!isPlaying ? <BsFillPlayFill /> : <BsFillPauseFill />}
                    </Button>
                    <Button onClick={() => stop()}>
                      <BsFillStopFill />
                    </Button>
                    <Button onClick={() => changeSong(1)}>
                      <BsFillSkipForwardFill />
                    </Button>
                    <Form.Range
                      className="w-50 p-1"
                      min="0"
                      max="100"
                      value={slider}
                      onChange={handleVolume}
                      onClick={handleVolume}
                      style={{ '--value': `${slider}%` }}
                    />
                    <Button
                      // className="bg-transparent border-0 fs-2 d-flex"
                      className=" fs-4 d-flex align-middle"
                      onClick={handleMute}
                    >
                      {volumeIcon()}
                    </Button>
                  </div>
                  {/* <ProgressBar now={progress} className="flex-grow-1 ms-1" /> */}
                </div>
                <div>
                  <ProgressBar
                    now={progress}
                    className="flex-grow-1 my-2"
                    onClick={(e) => handleTimeSkip(e)}
                  />

                  <audio
                    ref={audioRef}
                    src={selected?.preview}
                    onTimeUpdate={handleTimeUpdate}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => changeSong(0)}
                    onVolumeChange={() => handleVolume}
                  />
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
