import React from 'react';
import type { Program, FavoriteItem } from '../types';
import { programs } from '../constants';

interface HeroProps {
  favoriteItems: FavoriteItem[];
  liveProgram?: Program;
}

const Hero: React.FC<HeroProps> = ({ favoriteItems, liveProgram }) => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Praise FM Brasil</h1>
        <p>Sua rádio gospel online 24h</p>

        {liveProgram && (
          <div className="live-program">
            <h2>On Air Now</h2>
            <p>{liveProgram.title} - {liveProgram.host}</p>
          </div>
        )}

        <div className="favorite-items">
          {favoriteItems.map((item: FavoriteItem) => (
            <div key={item.id} className="favorite-card">
              <img src={item.image ?? '/placeholder-image.png'} alt={item.title} />
              <h3>{item.title}</h3>
              {item.subtitle && <p>{item.subtitle}</p>}
            </div>
          ))}
        </div>

        <div className="schedule">
          <h2>Programação</h2>
          {programs.map((prog: Program) => (
            <div key={prog.id} className="program-card">
              <span>{prog.startTime} - {prog.endTime}</span>
              <span>{prog.title}</span>
              <span>{prog.host}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
