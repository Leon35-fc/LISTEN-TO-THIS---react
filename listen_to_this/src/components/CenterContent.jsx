import { useEffect, useRef, useState } from 'react';
import {
  Form,
  Container,
  Card,
  Row,
  Col,
  ProgressBar,
  Button,
  Badge
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
  BsFillVolumeUpFill,
  BsHandThumbsUp,
  BsHandThumbsUpFill
} from 'react-icons/bs';

import { deezerFetch } from './deezerApi';
import CustomCarousel from './CustomCarousel';
import Results from './Results';

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
  //SUGGESTION

  // const deezerFetch = function (input) {
  //   if (!input || input == 'undefined') return;
  //   console.log('from fetch', input);

  //   fetch(searchURL + input)
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       } else {
  //         throw new Error('Errore nel recupero dei dati.');
  //       }
  //     })
  //     .then((data) => {
  //       console.log(data);

  //       setFetchedData(data.data);
  //     })
  //     .catch((error) => {
  //       console.log('Errore.', error);
  //     });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    deezerFetch(searchURL + inputForm.replaceAll(' ', '+'), setFetchedData);
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

    const box = e.currentTarget;
    const rect = box.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    let percentage = clickX / rect.width;

    if (percentage < 0.04) percentage = 0;
    if (percentage > 0.94) percentage = 1;
    setSliderValue(percentage * 100);
    console.log('% ', percentage);

    audioRef.current.volume = percentage;
  };

  const handleMute = function (e) {
    console.log(e.target);
    const rangeSlider = document.querySelector('.progress-bar');
    console.log('Il rangeSlider', rangeSlider.value);
    if (mute && slider == 0) {
      console.log('Slider prima di cambio parametri', slider);

      setMute(false);
      setSliderValue(sliderPrev);
      rangeSlider.value = sliderPrev;
      console.log("I'm on", sliderPrev);
      audioRef.current.volume = sliderPrev * 0.01;
    } else {
      setSliderPrevValue(slider);
      setMute(true);
      setSliderValue(0);
      console.log("I'm mute ", sliderPrev);
      audioRef.current.volume = 0;
    }
  };

  const volumeIcon = function () {
    const a = Math.ceil(slider / 34);
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

  useEffect(() => deezerFetch(), [])

  useEffect(() => selected ? play() : stop(), [selected]);

  useEffect(() => setIsPlaying(false), []);

  return (
    <>
      <Row className="row-cols-1 border border-2 border-black my-3 p-2">
        <Container>
          {/* CARD/PLAYER */}
          {fetchedData.length > 0 && (
            <Row className="my-3">
              <Card className="d-flex align-items-center">
                <Card.Img
                  variant="top"
                  src={
                    !selected
                      ? ' ' // 'https://placehold.co/400/' in alternativa alla stringa null
                      : selected.album.cover_xl
                  }
                  className="w-50 mt-2"
                />
                <Card.Body className="w-100">
                  <Card.Title className="d-flex align-content-start">
                    {!selected ? '' : selected.title}
                  </Card.Title>
                  <Card.Text className="d-flex align-content-start">
                    {!selected ? '' : selected.artist.name}
                  </Card.Text>
                  <div className="d-flex align-items-center">
                    <div className="d-flex justify-content-start gap-1 me-auto w-100">
                      <Button onClick={() => changeSong(-1)}>
                        <BsFillSkipBackwardFill className="fs-6 d-flex align-middle justify-content-start" />
                      </Button>
                      <Button
                        onClick={() => {
                          isPlaying ? pause() : play();
                        }}
                      >
                        {!isPlaying ? (
                          <BsFillPlayFill className="fs-6 d-flex align-middle justify-content-start" />
                        ) : (
                          <BsFillPauseFill className="fs-6 d-flex align-middle justify-content-start" />
                        )}
                      </Button>
                      <Button
                        onClick={() => stop()}
                        className="fs-6 d-flex align-middle justify-content-start"
                      >
                        <BsFillStopFill />
                      </Button>
                      <Button
                        onClick={() => changeSong(1)}
                        className="fs-6 d-flex align-middle justify-content-start"
                      >
                        <BsFillSkipForwardFill />
                      </Button>
                    </div>
                    <div className="d-flex align-items-center gap-2 flex-grow-1 ms-3">
                      <Form.Range
                        className="p-1"
                        min="0"
                        max="100"
                        defaultValue={slider}
                        onClick={handleVolume}
                      />
                      {/* <ProgressBar
                        now={slider}
                        className="w-50"
                        onClick={handleVolume}
                        onDrag={handleVolume}
                        // label={Math.round(slider)}
                      /> */}
                      <Button
                        className="fs-5 d-flex align-middle justify-content-start"
                        onClick={handleMute}
                      >
                        {volumeIcon()}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <ProgressBar
                      now={progress}
                      className="flex-grow-1 my-2"
                      onClick={(e) => handleTimeSkip(e)}
                    />
                    <p className="d-flex justify-content-between">
                      <span>{Math.round(audioRef.current?.currentTime)}</span>
                      <span>{Math.round(audioRef.current?.duration)}</span>
                    </p>
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
          )}

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

          {fetchedData && fetchedData.length > 0 && (
            <Container className="p-0 m-0">
              {/* <CustomCarousel dataAPI={fetchedData} /> */}
              {/* RISULTATI RICERCA */}
              <Results fetchedData={fetchedData} selected={selected} setSelected={setSelected} />
            </Container>
          )}
        </Container>
      </Row>
    </>
  );
};

export default CenterContent;
