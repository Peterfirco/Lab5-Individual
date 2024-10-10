import React, { useEffect, useState } from 'react';
import './App.css';
import { useMutation, useLazyQuery } from '@apollo/client';
import { GET_CORRECT_TRIANGLE } from './query/triangle';
import { CREATE_TRIANGLE } from './mutations/triangle';

function App() {
  const [firstSide, setFirstSide] = useState(0);
  const [secondSide, setSecondSide] = useState(0);
  const [thirdSide, setThirdSide] = useState(0);
  const [message, setMessage] = useState('');
  const [createTriangle] = useMutation(CREATE_TRIANGLE);
  const [checkTriangle, { data: checkData }] = useLazyQuery(GET_CORRECT_TRIANGLE);

  const handleSubmit = (e) => {
    e.preventDefault();

    checkTriangle({
      variables: {
        firstSide: parseFloat(firstSide),
        secondSide: parseFloat(secondSide),
        thirdSide: parseFloat(thirdSide)
      }
    });
  };

  useEffect(() => {
    if (checkData) {
      const canCreate = checkData.getCorrectTriangle;

      if (canCreate) {
        createTriangle({
          variables: {
            input: {
              firstSide: parseFloat(firstSide),
              secondSide: parseFloat(secondSide),
              thirdSide: parseFloat(thirdSide)
            }
          }
        }).then(() => {
          setMessage('Трикутник успiшно створено!');
        });
      } else {
        setMessage('Неможливо створити трикутник з такими довжинами.');
      }
    }
  }, [checkData, createTriangle, firstSide, secondSide, thirdSide]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={firstSide}
          onChange={(e) => setFirstSide(e.target.value)}
          type='number'
        />
        <input
          value={secondSide}
          onChange={(e) => setSecondSide(e.target.value)}
          type='number'
        />
        <input
          value={thirdSide}
          onChange={(e) => setThirdSide(e.target.value)}
          type='number'
        />
        <button type='submit'>Перевiрити та створити</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default App;