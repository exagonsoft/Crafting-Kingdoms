import React from 'react';

const LoadingAnimation = () => {
  return (
    <div className="loading-animation">
      {/* Hexagon 1 */}
      <div className="loading-hexagon">
      </div>
      {/* Hexagon 2 */}
      <div className="loading-hexagon">
        <div className="line"></div>
      </div>
      {/* Hexagon 3 */}
      <div className="loading-hexagon">
        <div className="line"></div>
      </div>
      {/* Hexagon 4 */}
      <div className="loading-hexagon">
        <div className="line"></div>
      </div>
      {/* Add more div elements for additional hexagons and lines */}
    </div>
  );
}

export default LoadingAnimation;
