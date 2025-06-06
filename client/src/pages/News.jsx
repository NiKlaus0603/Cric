import React from 'react';
import { mockNews } from '../data/mockNews';
import NewsCard from '../components/News/NewsCard';

const News = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">📰 Cricket News</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockNews.map((article, idx) => (
          <NewsCard key={idx} article={article} />
        ))}
      </div>
    </div>
  );
};

export default News;
