import { useSelector } from 'react-redux';
import ExploreContainerStyles from './ExploreContainer.module.scss';
import { selectDemoById, RTSelectDemoById } from '../../core/store/demo/demo.selectors';
import { AppState } from '../../core/store/app-state';

interface ContainerProps {
  name: string;
}

function ExploreContainer({ name }: ContainerProps): React.ReactElement {
  const demo = useSelector<AppState, RTSelectDemoById>((state) => selectDemoById(state, '2'));
  return (
    <div className={ExploreContainerStyles.container}>
      <strong>{name}</strong>
      {demo && <div>{`${demo.id}-${demo.name}`}</div>}

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
