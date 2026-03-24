// const searchURL =
//     'https://striveschool-api.herokuapp.com/api/deezer/search?q=';

export const deezerFetch = function (input, setFetchedData) {
    if (!input || input == 'undefined') return;
    console.log('from fetch', input);

    // fetch(searchURL + input)
    fetch(input)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error retriving data.');
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