import React from 'react';

export interface UBlueHeroProps {
  particleCount?: number;
  noiseScaleValue?: number;
  style?: React.CSSProperties;
  className?: string;
}

declare const UBlueHero: React.FC<UBlueHeroProps>;

export default UBlueHero;