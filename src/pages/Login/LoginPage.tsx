import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonPage, IonText, IonToast } from '@ionic/react';
import { useHistory } from 'react-router';
import { useCallback, useState } from 'react';

import LoginPageStyles from './LoginPage.module.scss';

const LoginPage: React.FC = () => {
  const history = useHistory();
  const initializationError = {
    // load this information from store in case the login is not working due to firebase(config) issues
    message: 'Fehler beim Verbindungsaufbau zur Datenbank',
  };
  const [tenant, setTenant] = useState(''); // organization, account, subaccount, tenant
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorInfo, setErrorInfo] = useState({ showErrorToast: false, errMsg: '' });

  const login = useCallback(() => {
    // todo: remove when connecting to authentication service
    console.log(`Tenant: ${tenant}`);
    console.log(`E-Mail: ${email}`);
    console.log(`Passwort: ${password}`);
    // todo: validate email for correct email format
    setErrorInfo({ showErrorToast: true, errMsg: 'Benutzername und Passwort stimmen nicht überein' });
  }, [tenant, email, password]);

  const handleLogin = useCallback(
    (e: React.MouseEvent<HTMLIonButtonElement, MouseEvent>) => {
      if (!e.currentTarget) {
        return;
      }
      e.preventDefault();
      login();
    },
    [login],
  );

  return (
    <IonPage className={LoginPageStyles.page}>
      <IonContent className={LoginPageStyles.content}>
        <IonText color="danger" style={{ fontWeight: '500' }}>
          {initializationError && initializationError.message}
        </IonText>

        <img src="/assets/icon/icon.png" alt="Team-Manager Logo" className={LoginPageStyles.logo} />

        <p className={LoginPageStyles.loginTitle}>Anmeldung</p>

        <IonItem className={LoginPageStyles.input}>
          <IonLabel position="stacked">Organisations-Id deines Teams</IonLabel>
          <IonInput
            type="email"
            placeholder="Organisation"
            onIonChange={(e) => {
              if (e && e.detail && e.detail.value) {
                setTenant(e.detail.value);
              }
            }}
            name="email"
          />
        </IonItem>

        <IonItem className={LoginPageStyles.input}>
          <IonLabel position="stacked">E-Mail Addresse</IonLabel>
          <IonInput
            type="email"
            placeholder="deine@mailadresse.de"
            onIonChange={(e) => {
              if (e && e.detail && e.detail.value) {
                setEmail(e.detail.value);
              }
            }}
            name="email"
          />
        </IonItem>

        <IonItem className={LoginPageStyles.input}>
          <IonLabel position="stacked">Passwort</IonLabel>
          <IonInput
            type="password"
            placeholder="Passwort"
            onIonChange={(e) => {
              if (e && e.detail && e.detail.value) {
                setPassword(e.detail.value);
              }
            }}
            name="password"
          />
        </IonItem>

        <div className={LoginPageStyles.buttons}>
          <IonButton expand="full" className={LoginPageStyles.loginButton} onClick={handleLogin}>
            Anmelden
          </IonButton>
          <a href="mailto:administrator@team-manager.solution" className={LoginPageStyles.forgotPassword}>
            Passwort vergessen?
          </a>
        </div>
        <IonToast
          color="danger"
          isOpen={errorInfo.showErrorToast}
          onDidDismiss={() => setErrorInfo({ showErrorToast: false, errMsg: '' })}
          message={errorInfo.errMsg}
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
