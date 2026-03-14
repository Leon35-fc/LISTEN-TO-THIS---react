import { useEffect, useState } from "react";
import { Row,
         Button,
         Figure
 } from "react-bootstrap";

import {
  BsHandThumbsUp,
  BsHandThumbsUpFill
} from 'react-icons/bs';

const Results = (props) =>{
    const [like, setLike] = useState([])

    const selected = props.selected
    const fetchedData = props.fetchedData
    const setSelected = props.setSelected

    const likeIcon = () => {   
        switch(like){
            case "true":
                return <BsHandThumbsUp />;
            case "false":
                return <BsHandThumbsUpFill />;
            default:
                return <BsHandThumbsUp />;  
            }
    }

    const handleLike = (id) => {
        localStorage.removeItem("results");
        localStorage.setItem("results", [...like, id]);
        console.log(localStorage.results);
        if(like.includes(id)){
            setLike(like.filter(itemId => itemId !== id))
        } else {
            setLike([...like, id]);
        }
        
    }

    useEffect(() => handleLike, [localStorage])

    return(
        <>
        <Row className="text-start border border-1 bg-info-subtle rounded rounded-2 py-2">
                <h4>Results</h4>
                {fetchedData.map((data) => (
                  <Row
                    key={data.id}
                    className={`row-cols-3 m-0 my-1 p-0 ${selected.id === data.id ? 'border border-1 border-dark' : ''}  rounded rounded-2 py-1`}
                    onClick={() =>
                      selected !== data ? setSelected(data) : setSelected('')
                    }
                  >
                    {/* <img src={data.album.cover_xl} alt="album cover" className="w-25"/> */}
                    <Figure className="m-0">
                        <Figure.Image
                        className="m-0"
                        width={125}
                        height={125}
                        alt="album cover"
                        src={data.album.cover_xl}/>
                    </Figure>
                    <div className="flex-grow-1 p-0">
                      <p className="mb-1">
                        <span className="fw-semibold">Artist</span>{' '}
                        {data.artist.name}
                      </p>
                      <p className="mb-1">
                        <span className="fw-semibold">Song</span> {data.title}
                      </p>
                      <p className="mb-1">
                        <span className="fw-semibold">Album</span>{' '}
                        {data.album.title}
                      </p>
                      <Row className="row-cols-2 row-cols-md-4 justify-content-between">

                        <Button onClick={(e) => {e.stopPropagation(); console.log("suggerita!");
                        }}> Suggest! </Button>

                        <Button 
                        className="bg-transparent text-primary border border-0" 
                        onClick={(e) => {e.stopPropagation(); handleLike(data.id); console.log(localStorage.results);}
                        }> {like.includes(data.id) ? <BsHandThumbsUpFill  className="transparent"/> : <BsHandThumbsUp />}</Button>
                        
                      </Row>
                    </div>
                  </Row>
                ))}
              </Row>
        </>
    )
}

export default Results;