import React from 'react';
import type { FavoriteItem } from '../types';

interface DevotionalSectionProps {
  items: FavoriteItem[];
}

const DevotionalSection: React.FC<DevotionalSectionProps> = ({ items }) => {
  return (
    <section className="devotional-section">
      <h2>Devocionais</h2>
      <div className="devotional-cards">
        {items.map((item: FavoriteItem) => (
          <div key={item.id} className="devotional-card">
            <img src={item.image ?? '/placeholder-image.png'} alt={item.title} />
            <h3>{item.title}</h3>
            {item.subtitle && <p>{item.subtitle}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default DevotionalSection;
