'use client';

import { React, useState } from 'react';
import getJoke from '../api/jokes';

// When a user first loads the app, a button appears on the DOM that reads "Get a Joke"
// When the user presses the "Get a Joke" button, an API call is made to the joke API and the joke setup appears on the DOM.
// When a user presses the "Get a Joke" button, the button text changes to "Get Punchline"
// When a user presses the "Get Punchline" button, both the joke setup and delivery are on the DOM along with a button that reads "Get Another Joke"
// When the user presses the "Get Another Joke" button, the app starts over from step 3.

export default function Test() {
  const [joke, setJoke] = useState(null);
  const [punchline, setPunchline] = useState(null);
  const [showPunchline, setShowPunchline] = useState(false);

  const handleGetJoke = async () => {
    if (showPunchline) {
      // Reset to fetch a new joke
      setJoke(null);
      setPunchline(null);
      setShowPunchline(false);
    } else if (!joke) {
      // Fetch a new joke
      const newJoke = await getJoke();
      setJoke(newJoke.setup);
      setPunchline(newJoke.delivery);
    } else {
      // Show punchline
      setShowPunchline(true);
    }
  };

  const getButtonText = () => {
    if (showPunchline) return 'Get Another Joke';
    if (joke) return 'Get Punchline';
    return 'Get A Joke';
  };
  return (
    <div>
      <button type="button" onClick={handleGetJoke}>
        {getButtonText()}
      </button>
      <p>Click the button to receive a random joke.</p>
      {joke && <p>{joke}</p>}
      {showPunchline && punchline && <p>{punchline}</p>}
    </div>
  );
}
