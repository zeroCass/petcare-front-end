import {useContext, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';

import {AuthContext} from '@context/Auth';
import axios from 'axios';
import {server} from '../../api';

export default ({navigation}) => {
  const {setUser} = useContext(AuthContext);
  const [email, setEmail] = useState('nami.mugiwara@example.com');
  const [password, setPassword] = useState('password123');
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const signin = async () => {
    // setUser({ token: true, employeeType: 'Attendant' })
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${server}/auth/signin`,
        {
          email,
          password,
        },
        {
          timeout: 5000,
        },
      );
      const [data] = res.data;
      setUser({...data, token: true});
      setIsLoading(false);
    } catch (e) {
      console.warn(e);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator animating={true} size="large" />
      ) : (
        <View style={styles.login}>
          <TextInput
            mode="outlined"
            label="E-mail"
            placeholder="usuario@email.com"
            value={email}
            onChangeText={email => setEmail(email)}
            left={<TextInput.Icon name="at" />}
          />
          <TextInput
            mode="outlined"
            label="Senha"
            placeholder="*******"
            value={password}
            onChangeText={password => setPassword(password)}
            secureTextEntry={!showPass}
            left={<TextInput.Icon name="lock" />}
            right={
              <TextInput.Icon
                name="eye"
                onPress={() => setShowPass(!showPass)}
              />
            }
          />
          <View style={styles.button}>
            <Button mode="contained" onPress={signin}>
              Login
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  login: {
    width: '80%',
    padding: 10,
  },
  button: {
    margin: 10,
  },
});
