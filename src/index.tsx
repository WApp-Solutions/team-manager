import { StrictMode } from 'react';
import { render } from 'react-dom';
import { Provider as StoreProvider } from 'react-redux';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import { epicMiddleware } from './core/store/middleware/epic';
import { rootEpic$ } from './core/store/root.epic';
import { AppStore } from './core/store/app-store';
import { RealTimeDatabase } from './core/firebase/real-time-database';

// initialize epic middleware
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
epicMiddleware.run(rootEpic$);

RealTimeDatabase.getInstance();

render(
  <StoreProvider store={AppStore}>
    <StrictMode>
      <App />
    </StrictMode>
  </StoreProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
