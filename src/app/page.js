'use client';

import { useState, useEffect } from 'react';

// any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.

import { useAuth } from '@/utils/context/authContext';
import { postFact, updateFact } from '../api/facts';

const dbUrl = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;

function Home() {
  const [uselessFact, setUselessFact] = useState({});
  const { user } = useAuth();
  const fetchFact = async () => {
    const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en');
    const fact = await response.json();

    setUselessFact(fact);
  };

  const selectResponse = async (boolean) => {
    const val = boolean ? 'Yes' : 'No';
    const obj = {
      userId: user.uid,
      text: uselessFact.text,
    };

    const response = await postFact(obj, val);
    await updateFact({ firebaseKey: response.name }, val);

    await fetch(`${dbUrl}/response${val}.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application.json',
      },
      body: JSON.stringify(obj),
    });
    fetchFact();
    return obj;
  };

  useEffect(() => {
    fetchFact();
  }, []);
  return (
    <>
      <h2>{uselessFact.text}</h2>
      <h4>Did you know this fact?</h4>
      <button className="btn btn-success" type="button" onClick={() => selectResponse(true)}>
        YES
      </button>
      <button className="btn btn-danger" type="button" onClick={() => selectResponse(false)}>
        NO
      </button>
    </>
  );
}

export default Home;
