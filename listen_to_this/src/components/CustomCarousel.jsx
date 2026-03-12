import { Carousel } from 'react-bootstrap';
import { deezerFetch } from './deezerApi';

const CustomCarousel = (
  { dataAPI }
) => {
  // console.log("Lunghezza: ", dataAPI.length);

  deezerFetch();
  return (
    <>
      {dataAPI && dataAPI.length > 0 && (
        <Carousel data-bs-theme="dark" className="bg-danger  w-100 my-3" interval={null}>
          {dataAPI.map((data) => (
            <Carousel.Item key={data.id}>
              <img
                src={data?.album.cover_xl}
                className="d-block mx-auto w-50"
                alt={data?.album.title}
              />
              <Carousel.Caption className="position-relative start-0 end-0 mt-3">
                <h3>{data?.title}</h3>
                <p>{data?.artist.name}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default CustomCarousel;
