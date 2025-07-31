import React from 'react';
import WatchCard from './WatchCard';

function WatchList({ watches, onDeleteWatch, onEditWatch }) { 
  return (
    <div className="watch-collection">
      <h2>Inventory</h2>
      {watches.map(watch => (
        <WatchCard 
          key={watch.id} 
          watch={watch} 
          onDelete={onDeleteWatch} 
          onEdit={onEditWatch} 
        />
      ))}
    </div>
  );
}

export default WatchList;