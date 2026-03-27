import { useState } from 'react';
import { Container, Row, Form, Button, Modal } from 'react-bootstrap';
import { deezerFetch } from './deezerApi';
import CustomCarousel from './CustomCarousel';
import Results from './Results';

function NewSuggestion(props) {
  //PROPS
  const showId = props.show;
  const setShow = props.setShow;
  const songId = props.songId;
  //CONST
  const searchURL =
    'https://striveschool-api.herokuapp.com/api/deezer/search?q=';
  //USESTATE
  const [suggestedForm, setSuggestedForm] = useState();
  const [suggestedFetchData, setSuggestedFetchData] = useState();
  const [suggestedSelect, setSuggestedSelect] = useState('')

    const handleSuggestedSearch = (e) => {
      e.preventDefault();
      deezerFetch(searchURL + suggestedForm.replaceAll(' ', '+'), setSuggestedFetchData);
      setSuggestedForm('');
    };

    const handleSuggestedSubmit = (e) => {
      e.stopPropagation();
      console.log(songId);
      console.log(suggestedSelect);
      let suggested = {
        "songId": songId,
        "suggestionId": suggestedSelect.id,
        "vote": 0
      }
      console.log("To suggested-API", suggested);

      fetch('http://localhost:3001/suggestions/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(suggested),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nella risposta del server");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Successo! Dati salvati o aggiornati:", data);
    })
    .catch((error) => {
      console.error("Errore durante la fetch:", error);
    });
    }

  return (
    <>
      <Modal show={showId == songId} onHide={() => setShow(false)} onClick={(e) => e.stopPropagation()}>
        <Modal.Header closeButton>
          <Modal.Title>Suggest a song!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="my-2">
            <Form className="p-0" onSubmit={handleSuggestedSearch}>
              <Form.Control
                type="text"
                placeholder="Search a song"
                value={suggestedForm}
                onChange={(e) => {(setSuggestedForm(e.target.value))}}
              />
            </Form>
          </Row>

          {suggestedFetchData && suggestedFetchData.length > 0 && (
            <Container className="p-0 m-0">
              <Results
                text={''}
                fetchedData={suggestedFetchData}
                selected={suggestedSelect}
                setSelected={setSuggestedSelect}
                modal={true}
              />
            </Container>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {setShow(false)}}>
            Close
          </Button>
          <Button variant="primary" onClick={(e) => {handleSuggestedSubmit(e); setShow(false)}}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NewSuggestion;