import './ExploreContainer.css';
import React from 'react';

interface ContainerProps {
  name: string;
}

function ExploreContainer({ name }: ContainerProps): React.ReactElement {
  return (
    <div className="container">
      <strong>{name}</strong>
      <p>
        Explore
        <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">
          UI Components
        </a>
      </p>
    </div>
  );
}

export default ExploreContainer;
