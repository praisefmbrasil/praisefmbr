import React from 'react';
import type { FavoriteItem } from '../types';

interface DevotionalSectionProps {
  items: FavoriteItem[];
}

const DevotionalSection: React.FC<DevotionalSectionProps> = ({ items }) => {
  return (
    <section className="devotional-section">
      <h2 className="section-title">Devocionais</h2>
      <div className="devotional-cards">
        {items.map((item: FavoriteItem) => (
          <div key={item.id} className="devotional-card">
            <img
              src={item.image ?? '/placeholder-image.png'}
              alt={item.title}
              className="devotional-image"
            />
            <div className="devotional-info">
              <h3 className="devotional-title">{item.title}</h3>
              {item.subtitle && <p className="devotional-subtitle">{item.subtitle}</p>}
              {item.host && <p className="devotional-host">{item.host}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DevotionalSection;
