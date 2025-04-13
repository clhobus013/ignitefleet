import { useState } from 'react';
import { Alert } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { IOS_CLIENT_ID, WEB_CLIENT_ID } from '@env';
import { Container, Slogan, Title } from './styles';
import backgroundImg from '../../assets/background.png';

import { Button } from '../../components/Button';


GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId: WEB_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID
});

export function SignIn() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function handleGoogleSignIn() { 
    try {
      setIsAuthenticating(true);

      const { data } = await GoogleSignin.signIn();

      if(data?.idToken) {

      } else {
        Alert.alert("Entrar", "Não foi possível conectar-se a sua conta google.");
        setIsAuthenticating(false);
      }
      
    } catch (error) {
      console.log(error);
      setIsAuthenticating(false);
      Alert.alert("Entrar", "Não foi possível conectar-se a sua conta google.")
    }
  }

  return (
    <Container source={backgroundImg}>
      <Title>Ignite Fleet</Title>
      <Slogan>Gestão de uso de veículos</Slogan>

      <Button
        title='Entrar com o Google'
        isLoading={isAuthenticating}
        onPress={handleGoogleSignIn}
      />
    </Container>
  );
}