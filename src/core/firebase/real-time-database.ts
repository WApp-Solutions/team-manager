import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import firebase from 'firebase/app';
import { realTimeDatabase } from './firebase';
import { Demo, DemoKey } from '../store/demo/types';
import { demoActions } from '../store/demo/demo.slice';
import { AppStore } from '../store/app-store';
import { isType } from '../util/is-type';

interface DataPath<T> {
  path: string;
  events: {
    type: firebase.database.EventType;
    storeAction: ActionCreatorWithPayload<T>;
  }[];
}

interface DataPathWithDBRef<T> extends DataPath<T> {
  ref?: firebase.database.Reference | undefined;
  childPaths?: DataPath<T>[];
}

const DBEntity = {
  DEMO: 'Demo',
  TEST: 'Test',
} as const;

export class RealTimeDatabase {
  private static instance: RealTimeDatabase;

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
    private databasePathMap: Map<string, DataPathWithDBRef<any>> = new Map<string, DataPathWithDBRef<any>>([
    [
      DBEntity.DEMO,
      {
        path: '/demo',
        events: [
          { type: 'child_added', storeAction: demoActions.addDemo },
          { type: 'child_changed', storeAction: demoActions.updateDemo },
          { type: 'child_removed', storeAction: demoActions.removeDemo },
        ],
        childPaths: [
          {
            path: '/deep',
            events: [],
          },
        ],
      } as DataPathWithDBRef<Demo>,
    ],
    [DBEntity.TEST, { path: '/test', events: [] }],
  ]);

  private constructor() {
    this.initialize();
  }

  public static getInstance(): RealTimeDatabase {
    if (!RealTimeDatabase.instance) {
      RealTimeDatabase.instance = new RealTimeDatabase();
    }
    return RealTimeDatabase.instance;
  }

  public addDemo = (demoTitle: string): void => {
    console.log('Add Demo');
    this.databasePathMap
      .get(DBEntity.DEMO)
      ?.ref?.push({ name: demoTitle })
      .catch((e) => console.log(e));
  };

  private initialize = () => {
    this.databasePathMap.forEach((dataPathWithDBRef, dataName) => {
      const newDataPathWithDBRef = {
        ...dataPathWithDBRef,
        ref: realTimeDatabase?.ref(dataPathWithDBRef.path),
      };

      newDataPathWithDBRef.events.forEach((e) => {
        newDataPathWithDBRef.ref?.on(e.type, this.handleEvent(e.storeAction));
      });

      newDataPathWithDBRef.childPaths?.forEach((a) => {
        a.events.forEach((e) => {
          newDataPathWithDBRef.ref?.child(a.path).on(e.type, this.handleEvent(e.storeAction));
        });
      });
      this.databasePathMap.set(dataName, newDataPathWithDBRef);
    });

    /* this.databasePathMap.get(DBEntity.DEMO)?.ref?.on('child_changed', this.handleEvent<Demo>(demoActions.updateDemo));
    this.databasePathMap.get(DBEntity.DEMO)?.ref?.on('child_added', this.handleEvent<Demo>(demoActions.addDemo));
    this.databasePathMap.get(DBEntity.DEMO)?.ref?.on('child_removed', this.handleEvent<Demo>(demoActions.removeDemo)); */
  };

  private handleEvent = <T>(
    action: ActionCreatorWithPayload<T>,
  ): ((snapshot: firebase.database.DataSnapshot) => void) => (snapshot) => {
    // Make sure to use TypeGuard for snapshot value to ensure its integrity
    let value = snapshot.val() as T;
    value = { ...value, id: snapshot.key as string };
    // TODO: add keyStructure
    if (isType<T>(value, DemoKey)) {
      AppStore.dispatch(action(value));
    }
  };
}
