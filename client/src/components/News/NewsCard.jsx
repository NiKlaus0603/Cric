import React from 'react';

const NewsCard = ({ article }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md">
      <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{article.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{article.summary}</p>
        <a
          href={article.url}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 dark:text-blue-400 text-sm mt-3 inline-block"
        >
          Read more →
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
