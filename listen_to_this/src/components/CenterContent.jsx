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
import { TbRepeat, TbRepeatOnce, TbRepeatOff } from "react-icons/tb";

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
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState();
  const [progress, setProgress] = useState(0);
  //VOLUME
  const [slider, setSliderValue] = useState(50);
  const [sliderPrev, setSliderPrevValue] = useState(0);
  const [mute, setMute] = useState(false);
  //TRACK
  const [repeat, setRepeat] = useState(0);
  //SUGGESTION

  //FUNCTIONS
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

    // const box = e.currentTarget;
    // const rect = box.getBoundingClientRect();
    // const clickX = e.clientX - rect.left;
    let percentage = e.target.value * 0.01;

    if (percentage < 0.04) percentage = 0;
    if (percentage > 0.94) percentage = 1;
    setSliderValue(percentage * 100);
    console.log('% ', percentage);

    audioRef.current.volume = percentage;
  };

  const handleMute = function (e) {
    console.log(e.target);
    if (mute && slider == 0) {
      console.log('Slider prima di cambio parametri', slider);

      setSliderValue(sliderPrev);
      audioRef.current.volume = sliderPrev * 0.01;
      setMute(false);
      // rangeSlider.value = sliderPrev;
      console.log("I'm on", sliderPrev);
    } else {
      setSliderPrevValue(slider);
      setSliderValue(0);
      setMute(true);
      audioRef.current.volume = 0;
      console.log("I'm mute ", sliderPrev);
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

  const repeatIcon = function (rep){
    const a = rep % 3;
    // setRepeat(a)
    switch (a) {
      // case 0:
      //   return <TbRepeatOff/>;
      case 1:
        return <TbRepeat />;
      case 2:
        return <TbRepeatOnce />;
      default:
        return <TbRepeatOff />;
    }
  }

  const songTimeFormat = (time) => {
    if (typeof time == 'number'){
    // console.log('Funziono!', `01:${seconds}`);
    let seconds = Math.round(time % 60)
    let minutes = Math.round(time / 60)

    seconds = seconds.toString().padStart(2, 0)
    minutes = minutes.toString().padStart(2, 0)
    return minutes + ":" + seconds
    }
  }

  useEffect(() => deezerFetch(), [])

  useEffect(() => selected ? play() : stop(), [selected]);

  // useEffect(() => repeat == 'repeat_one' ? play() : changeSong())

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
                <Card.Body className="border border-2 rounded rounded-3 w-100 my-2">
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
                      <Button
                        onClick={() => {setRepeat((repeat + 1)%3);console.log(repeatIcon())}}
                        className="fs-6 d-flex align-middle justify-content-start"
                      >
                        {repeatIcon(repeat)}
                      </Button>
                    </div>
                    <div className="d-flex align-items-center gap-2 flex-grow-1 ms-3">
                      <Form.Range
                        className="p-1"
                        min="0"
                        max="100"
                        value={slider}
                        onChange={handleVolume}
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
                    <p className="d-flex  mb-0">
                      <span>{songTimeFormat(audioRef.current?.currentTime)}</span>
                      <span>/{songTimeFormat(audioRef.current?.duration)}</span>
                    </p>
                    <audio
                      ref={audioRef}
                      src={selected?.preview}
                      onTimeUpdate={handleTimeUpdate}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onEnded={() => repeat == 2 ? play() : changeSong(repeat)} 
                      onVolumeChange={() => handleVolume}
                    />
                  </div>
                </Card.Body>
              </Card>
            </Row>
          )}

          {/* SEARCHBAR */}
          <Row className="my-2">
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
              <Results fetchedData={fetchedData} selected={selected} setSelected={setSelected} modal={false}/>
            </Container>
          )}
        </Container>
      </Row>
    </>
  );
};

export default CenterContent;
