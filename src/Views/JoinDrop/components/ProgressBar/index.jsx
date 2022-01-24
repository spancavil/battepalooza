import React, {useState, useEffect} from 'react';
/**
 * 
 * @param width Size in pixels
 * @param totalTime the totalTime for progressbarToBeCompleted in milliseconds
 * @returns 
 */
const ProgressBar = ({width, totalTime, finish}) => {
  const [acc, setAcc] = useState (0);
  const [intervalo, setIntervalo] = useState ();

  useEffect (() => {
    const interval = setInterval (() => {
      setAcc (acc => acc + 10);
    }, 10);
    setIntervalo (interval);
  }, []);

  useEffect (
    () => {
      if (acc > totalTime) {
        clearInterval (intervalo);
        finish ();
      }
    },
    [acc, totalTime, intervalo, finish]
  );

  return (
    <div
      style={{
        width,
        border: '1px solid white',
        height: '33px',
      }}
    >
      <div
        style={{
          width: `${acc / totalTime * 100}%`,
          backgroundColor: '#0146D5',
          height: '33px',
        }}
      />
    </div>
  );
};

export default ProgressBar;
