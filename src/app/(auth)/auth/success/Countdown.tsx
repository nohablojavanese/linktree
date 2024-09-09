'use client'

import React, { useState, useEffect } from 'react';

interface CountdownProps {
  initialSeconds: number;
}

const Countdown: React.FC<CountdownProps> = ({ initialSeconds }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center text-xl font-bold mb-4">
      {seconds > 0 ? `${seconds} seconds remaining` : "Time's up!"}
    </div>
  );
};

export default Countdown;
