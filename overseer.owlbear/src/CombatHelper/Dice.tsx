import React, { useEffect, useState } from 'react';

interface DiceProps {
  rolling: boolean;
}

const Dice: React.FC<DiceProps> = ({ rolling }) => {
  const [face, setFace] = useState<number | null>(null);

  useEffect(() => {
    if (rolling) {
      const rollInterval = setInterval(() => {
        setFace(Math.floor(Math.random() * 20) + 1);
      }, 100);

      setTimeout(() => {
        clearInterval(rollInterval);
      }, 2000);
    }
  }, [rolling]);

  return (
    <div
      style={{
        width: '50px',
        height: '50px',
        border: '1px solid black',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '24px',
        fontWeight: 'bold',
        transition: 'font-size 2s ease-in-out',
        marginRight: '10px',
      }}
    >
      {face !== null ? face : '❓'}
    </div>
  );
};

export default Dice;
