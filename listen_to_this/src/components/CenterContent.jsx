import { useEffect, useState } from 'react';
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
  const [inputSubmited, setInputSubmited] = useState('');
  const [fetchedData, setFetchedData] = useState([]);
  const [selected, setSelected] = useState();


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
  };

  return (
    <>
      <div className="border border-2 border-black my-3 p-2">
        <p>CENTER CONTENT</p>
        <Container>
          <Row className="my-1">
            <Form className="p-0" onSubmit={handleSubmit}>
              <Form.Control
                type="text"
                placeholder="Search"
                value={inputForm}
                onChange={(e) => setInputForm(e.target.value)}
              />
            </Form>
          </Row>
          <Row className="my-3">
            <Card className="d-flex align-items-center">
              <Card.Img
                variant="top"
                src="https://placehold.co/400x400"
                className="w-50"
              />
              <Card.Body className="w-100">
                <Card.Title className="d-flex align-content-start">
                  Song Title
                </Card.Title>
                <Card.Text className="d-flex align-content-start">
                  Artist Name
                </Card.Text>
                <div className="d-flex">
                  <div className="d-flex justify-content-start gap-1 me-auto">
                    <Button>
                      <BsFillSkipBackwardFill />
                    </Button>
                    <Button>
                      <BsFillPlayFill />
                    </Button>
                    <Button>
                      <BsFillStopFill />
                    </Button>
                    <Button>
                      <BsFillSkipForwardFill />
                    </Button>
                  </div>
                  <ProgressBar now="20" className="flex-grow-1 ms-1" />
                </div>
                <div>
                  <ProgressBar now="20" className="flex-grow-1 my-2" />
                </div>
              </Card.Body>
            </Card>
          </Row>
          <Container className="p-0 m-0">
            <Row className="text-start border border-1 bg-info-subtle rounded rounded-2">
              <h4>SUGGESTIONS</h4>
              {fetchedData.map((data) => (
                <Row
                  key={data.id}
                  className={`row-cols-2 m-0 my-1 p-0 ${selected === data.id ? "border border-1 border-dark" : ""}  rounded rounded-2`}
                  onClick={() => setSelected(data.id)}
                >
                  <img src={data.album.cover} alt="" className="w-25" />
                  <div>
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
        </Container>
      </div>
    </>
  );
};

export default CenterContent;
