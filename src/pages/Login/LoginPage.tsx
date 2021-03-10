import { InputChangeEventDetail } from '@ionic/core';
import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonPage, IonText, IonToast } from '@ionic/react';
import { useCallback, useState } from 'react';

import LoginPageStyles from './LoginPage.module.scss';
import { Authenticator, ProviderType } from '../../core/firebase/authenticator';

// import { Authenticator, ProviderType } from '../../core/firebase/authenticator';

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

  const login = useCallback(async () => {
    await Authenticator.getInstance().signInWith(ProviderType.GITHUB);
    /* const a = await axios.get('http://localhost:3000/', {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImM0ZWFhZjkxM2VlNWY0MDY0YmE2NjUzN2M0Njk3YzY5OGE3NGYwODIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiRmFiaWFuIEhpbHoiLCJwaWN0dXJlIjoiaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzExMzE1MzIxP3Y9NCIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9hdXRoZW50aWNhdGlvbi10ZXN0LWMwNTUwIiwiYXVkIjoiYXV0aGVudGljYXRpb24tdGVzdC1jMDU1MCIsImF1dGhfdGltZSI6MTYxNDYyNDg0OSwidXNlcl9pZCI6IjBKMUxYWkk4RDBkWHVRZDFYNnhJb2tEVmVIZDIiLCJzdWIiOiIwSjFMWFpJOEQwZFh1UWQxWDZ4SW9rRFZlSGQyIiwiaWF0IjoxNjE0OTQ2MDk5LCJleHAiOjE2MTQ5NDk2OTksImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ2l0aHViLmNvbSI6WyIxMTMxNTMyMSJdfSwic2lnbl9pbl9wcm92aWRlciI6ImdpdGh1Yi5jb20ifX0.zh-whkybXBG50DTPFW6ZCVMkD3ELO-T6CWwWWhUQ-gKWwZAuuNDWqmrxew5LrbCT9aEYrHSTCpwBFzdX1dPhBA7dgZlZRyuj893BvZeAosW5MEKE7jqUnmRpCadlBNGhqcp8ZtXJg1zhJJk-GfYO21ILCiAUK5MZyy9l0OYrXHrUFX0DVzjz202x2QJB-1edD_cN5NdF3VlpZpsPaQdTUD0AzEfbZGJv3RbzeSDW5SM7h76Z9HlnFu6PQr07INzO52qwRE98GJ-R4bRtm12lF96QbJ4ohY1xEftsZQoq7IjBlEyuFaUNsYlm9fCD480yyFc9A29VeLLp2G3h7qzHWg',
      },
    }); */

    // console.log(a.data);
    // todo: remove when connecting to authentication service
    console.log(`Tenant: ${tenant}`);
    console.log(`E-Mail: ${email}`);
    console.log(`Passwort: ${password}`);
    // todo: validate email for correct email format
    // setErrorInfo({ showErrorToast: true, errMsg: 'Benutzername und Passwort stimmen nicht überein' });
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
    async (e: React.MouseEvent<HTMLIonButtonElement, MouseEvent>) => {
      if (!e.currentTarget) {
        return;
      }
      e.preventDefault();
      await login();
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
        {Authenticator.getCurrentUser()?.displayName}
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
