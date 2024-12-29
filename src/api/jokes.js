const apiURL = 'https://v2.jokeapi.dev/joke/Any';

const getJoke = async () => {
  const read = await fetch(`${apiURL}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const response = read.json();
  return response;
};

export default getJoke;
