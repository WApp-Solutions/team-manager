import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem } from '@ionic/react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { ExploreContainer } from '../../components';

import { demoActions } from '../../core/store/demo/demo.slice';
import { DatabaseConnectionIcon } from '../../components/DatabaseConnectionIcon';

import localStyles from './Page.module.scss';

const Page: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const dispatch = useDispatch();

  const handleAdd = useCallback(() => {
    dispatch(demoActions.addDemo({ id: '2', name: 'demo2' }));
  }, [dispatch]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle onClick={handleAdd}>{name}</IonTitle>
          <IonItem className={localStyles.ionItem} slot="end">
            <DatabaseConnectionIcon />
          </IonItem>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name={name} />
      </IonContent>
    </IonPage>
  );
};

export default Page;
