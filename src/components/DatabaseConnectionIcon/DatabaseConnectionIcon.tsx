import { FC } from 'react';
import { IonIcon } from '@ionic/react';
import cn from 'classnames';
import { cloud, cloudOffline } from 'ionicons/icons';
import { useSelector } from 'react-redux';
import { RTSelectLatestErrorByType, selectLatestErrorByType } from '../../core/store/error/error.selectors';
import { TMErrorType } from '../../core/store/error/error.types';
import { AppState } from '../../core/store/app-state';
import localStyles from './DatabaseConnectionIcon.module.scss';

const DatabaseConnectionIcon: FC = () => {
  const connectionError = useSelector<AppState, RTSelectLatestErrorByType>((state) =>
    selectLatestErrorByType(state, TMErrorType.DATABASE),
  );

  return (
    <>
      {connectionError ? (
        <IonIcon className={cn(localStyles.ionIcon, localStyles.failure)} icon={cloudOffline} />
      ) : (
        <IonIcon className={cn(localStyles.ionIcon, localStyles.success)} icon={cloud} />
      )}
    </>
  );
};

export default DatabaseConnectionIcon;
