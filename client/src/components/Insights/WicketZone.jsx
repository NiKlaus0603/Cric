import React from 'react';

const WicketZone = ({ wickets }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md mt-6">
      <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Wicket Zones</h3>

      <div className="relative w-full max-w-md h-96 mx-auto bg-green-200 dark:bg-green-700 rounded-xl overflow-hidden">
        {/* Static SVG pitch outline */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-1 h-full bg-white opacity-40"></div> {/* center line */}
        </div>

        {/* Wicket dots */}
        {wickets.map((wicket, index) => (
          <div
            key={index}
            className="absolute w-4 h-4 rounded-full bg-red-600 hover:scale-110 transition"
            style={{
              top: `${wicket.y}%`,
              left: `${wicket.x}%`,
              transform: 'translate(-50%, -50%)',
            }}
            title={`${wicket.player} (${wicket.type})`}
          />
        ))}
      </div>
    </div>
  );
};

export default WicketZone;
