import React from 'react';

const BowlerLengthMap = ({ deliveries }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md mt-6">
      <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Bowler Length Map</h3>

      <div className="relative w-full max-w-md h-72 mx-auto bg-neutral-200 dark:bg-neutral-700 rounded-xl overflow-hidden border border-gray-300 dark:border-gray-600">
        {/* Pitch layout */}
        <div className="absolute inset-y-0 left-1/2 w-1 bg-white opacity-30"></div> {/* center line */}

        {/* Delivery dots */}
        {deliveries.map((ball, idx) => {
          const color =
            ball.length === 'Short' ? 'bg-yellow-400' :
            ball.length === 'Good' ? 'bg-green-500' :
            ball.length === 'Full' ? 'bg-blue-500' : 'bg-gray-400';

          return (
            <div
              key={idx}
              className={`absolute w-3 h-3 rounded-full ${color} hover:scale-125 transition`}
              style={{
                top: `${ball.y}%`,
                left: `${ball.x}%`,
                transform: 'translate(-50%, -50%)',
              }}
              title={`${ball.bowler} – ${ball.length}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BowlerLengthMap;
