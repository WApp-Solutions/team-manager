import { InputChangeEventDetail } from '@ionic/core';
import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonPage, IonText, IonToast } from '@ionic/react';
import { useCallback, useState } from 'react';

import LoginPageStyles from './LoginPage.module.scss';

enum ChangeType {
  TENANT = 'tenant',
  EMAIL = 'email',
  PASSWORD = 'password',
}

const LoginPage: React.FC = () => {
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

  const handleChange = useCallback(
    (type: ChangeType): ((event: CustomEvent<InputChangeEventDetail>) => void) => (e) => {
      if (e.detail.value) {
        switch (type) {
          case ChangeType.TENANT:
            setTenant(e.detail.value);
            break;
          case ChangeType.EMAIL:
            setEmail(e.detail.value);
            break;
          case ChangeType.PASSWORD:
            setPassword(e.detail.value);
            break;
          default:
          // do nothing
        }
      }
    },
    [setTenant, setEmail, setPassword],
  );

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

  const handleToastDismiss = useCallback(() => {
    setErrorInfo({ showErrorToast: false, errMsg: '' });
  }, [setErrorInfo]);

  return (
    <IonPage className={LoginPageStyles.page}>
      <IonContent className={LoginPageStyles.content}>
        <div className={LoginPageStyles.headerContainer}>
          <IonText color="danger" style={{ fontWeight: '500' }}>
            {initializationError && initializationError.message}
          </IonText>
          <img src="/assets/icon/icon.png" alt="Team-Manager Logo" className={LoginPageStyles.logo} />
        </div>
        <p className={LoginPageStyles.loginTitle}>Anmeldung</p>

        <IonItem className={LoginPageStyles.input}>
          <IonLabel position="stacked">Organisations-Id deines Teams</IonLabel>
          <IonInput type="text" placeholder="Organisation" onIonChange={handleChange(ChangeType.TENANT)} name="email" />
        </IonItem>

        <IonItem className={LoginPageStyles.input}>
          <IonLabel position="stacked">E-Mail Adresse</IonLabel>
          <IonInput
            type="email"
            placeholder="deine@mailadresse.de"
            onIonChange={handleChange(ChangeType.EMAIL)}
            name="email"
          />
        </IonItem>

        <IonItem className={LoginPageStyles.input}>
          <IonLabel position="stacked">Passwort</IonLabel>
          <IonInput
            type="password"
            placeholder="Passwort"
            onIonChange={handleChange(ChangeType.PASSWORD)}
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
          onDidDismiss={handleToastDismiss}
          message={errorInfo.errMsg}
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
