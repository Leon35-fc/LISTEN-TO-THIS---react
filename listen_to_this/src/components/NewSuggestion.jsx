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
        "song_id": songId,
        "suggested_id": suggestedSelect.id,
        "vote": 0
      }
      console.log("To suggested-API", suggested);
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