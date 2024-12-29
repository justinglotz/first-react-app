'use client';

import React, { useEffect, useState } from 'react';
import FactCard from '@/components/factCard';
import PropTypes from 'prop-types';
import { readFacts } from '../../../api/facts';

export default function ResponsePage({ params, searchParams }) {
  const [facts, setFacts] = useState([]);

  const getFacts = () => {
    readFacts(params.userId, searchParams.value).then(setFacts);
  };

  useEffect(() => {
    getFacts();
  }, [getFacts]);

  return (
    <div>
      {Object.values(facts).map((fact) => (
        <FactCard key={fact.firebaseKey} fact={fact} deleteFunc={getFacts} />
      ))}
    </div>
  );
}

ResponsePage.propTypes = {
  params: PropTypes.string.isRequired,
  searchParams: PropTypes.string.isRequired,
};
