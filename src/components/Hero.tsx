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
        <h1 className="hero-title">Praise FM Brasil</h1>
        <p className="hero-subtitle">Sua rádio gospel online 24h</p>

        {liveProgram && (
          <div className="live-program">
            <h2>On Air Now</h2>
            <p>{liveProgram.title} - {liveProgram.host}</p>
          </div>
        )}

        <div className="favorite-items">
          {favoriteItems.map((item: FavoriteItem) => (
            <div key={item.id} className="favorite-card">
              <img
                src={item.image ?? '/placeholder-image.png'}
                alt={item.title}
                className="favorite-image"
              />
              <h3 className="favorite-title">{item.title}</h3>
              {item.subtitle && <p className="favorite-subtitle">{item.subtitle}</p>}
            </div>
          ))}
        </div>

        <div className="schedule">
          <h2>Programação</h2>
          {programs.map((prog: Program) => (
            <div key={prog.id} className="program-card">
              <span className="program-time">{prog.startTime} - {prog.endTime}</span>
              <span className="program-title">{prog.title}</span>
              <span className="program-host">{prog.host}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
