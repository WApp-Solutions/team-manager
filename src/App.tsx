/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.scss';

import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

import { Menu } from './components';
import LoginPage from './pages/Login/LoginPage';
import Page from './pages/Page/Page';

setupIonicReact();

// User is authenticated and has access to protected views
const isAuthenticated = false;
const App: React.FC = () => (
  <IonApp>
    {isAuthenticated ? (
      <>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <Menu />
            <IonRouterOutlet id="main">
              <Route path="/" exact>
                <Redirect to="/page/Inbox" />
              </Route>
              <Route path="/page/:name" exact>
                <Page />
              </Route>
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </>
    ) : (
      <LoginPage />
    )}
  </IonApp>
);

export default App;
