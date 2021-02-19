import { IonButton } from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';
import ExploreContainerStyles from './ExploreContainer.module.scss';
import { AppState } from '../../core/store/app-state';
import { RTSelectDemoById, selectDemoById } from '../../core/store/demo/demo.selectors';

import { demoActions } from '../../core/store/demo/demo.slice';

interface ContainerProps {
  name: string;
}

function ExploreContainer({ name }: ContainerProps): React.ReactElement {
  const demo = useSelector<AppState, RTSelectDemoById>((state) => selectDemoById(state, '2'));
  const dispatch = useDispatch();

  const handleDemoAdd = () => {
    dispatch(demoActions.triggerAddDemo('Added via Button'));
  };

  return (
    <div className={ExploreContainerStyles.container}>
      <strong>{name}</strong>
      {demo && <div>{`${demo.id}-${demo.name}`}</div>}

      <IonButton onClick={handleDemoAdd}>Add a Demo</IonButton>

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
