import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useContext, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {IconButton, Searchbar, TextInput} from 'react-native-paper';

import {ClientContext} from '@context/Client';
import axios from 'axios';
import {server} from '../../api';

export default props => {
  const {client, setClient} = useContext(ClientContext);

  const [search, setSearch] = useState('');
  const [newClient, setNewClient] = useState(false);
  const [state, setState] = useState(client);
  const [editable, setEditable] = useState(false);
  const [editField, setEditField] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const deleteClient = async () => {
    setIsLoading(true);
    try {
      const res = await axios.delete(`${server}/client/${state.cpf}`);
      if (res.status === 200) console.warn('Usuario Deletado');
      setIsLoading(false);
      initialState();
    } catch (e) {
      console.warn(e);
      setIsLoading(false);
      initialState();
    }
  };

  const fetchSearch = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${server}/client/${search}`);
      const [data] = res.data;
      console.log('Client fetch Data: ', data);

      setClient(data);
      setState(data);
      setIsLoading(false);
    } catch (e) {
      console.warn(e);
      setIsLoading(false);
      initialState();
    }
  };

  const saveClient = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${server}/client`, {
        ...state,
      });
      if (res.status === 200) {
        console.warn('Cliente Criado!');
        setClient(state);
        setState(state);
      }
      setIsLoading(false);
    } catch (e) {
      console.warn(e);
      setIsLoading(false);
      initialState();
    }
  };

  const updateClient = async () => {
    setIsLoading(true);
    try {
      const res = await axios.put(`${server}/client`, {
        ...state,
      });
      if (res.status === 200) {
        console.warn('Cliente Atualizado!');
        setClient(state);
        setState(state);
      }
      setIsLoading(false);
    } catch (e) {
      console.warn(e);
      setIsLoading(false);
      initialState();
    }
  };

  // reset all state
  const initialState = () => {
    setState({});
    setNewClient(false);
    setSearch('');
    setEditable(false);
    setEditField(false);
  };

  // run everytime is focus
  useFocusEffect(
    useCallback(() => {
      // if has no client, reset the state
      if (Object.keys(client).length === 0) initialState();
    }, [client]),
  );

  return (
    <View style={styles.container}>
      {!newClient && Object.keys(state).length === 0 ? (
        <View style={{flex: 1, alignItems: 'center'}}>
          <View style={styles.searchView}>
            <Searchbar
              placeholder="CPF do Cliente"
              value={search}
              onChangeText={search => setSearch(search)}
              style={{width: '80%'}}
              onIconPress={() => fetchSearch()}
            />
          </View>
        </View>
      ) : (
        <View style={styles.deleteButton}>
          <IconButton
            icon="delete"
            color="red"
            size={25}
            onPress={() => {
              if (state.cpf && state.cpf.length > 0) deleteClient();
            }}
          />
        </View>
      )}
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" animating={isLoading} />
        </View>
      ) : (
        <>
          {newClient || Object.keys(state).length > 0 ? (
            <View style={styles.content}>
              <TextInput
                disabled={!editField}
                mode="outlined"
                label="Nome"
                placeholder="Maria da Silva"
                value={state.name}
                onChangeText={name => setState({...state, name: name})}
                left={<TextInput.Icon name="account" />}
              />
              <TextInput
                disabled={!editField}
                mode="outlined"
                label="E-mail"
                placeholder="usuario@email.com"
                value={state.email}
                onChangeText={email => setState({...state, email: email})}
                left={<TextInput.Icon name="at" />}
              />
              <TextInput
                disabled={!editField}
                mode="outlined"
                label="CPF"
                placeholder="000.000.000-00"
                value={state.cpf}
                onChangeText={cpf => setState({...state, cpf})}
                left={<TextInput.Icon name="at" />}
              />
              <TextInput
                disabled={!editField}
                mode="outlined"
                label="Telefone"
                placeholder="061900000000"
                value={state.phone}
                onChangeText={phone => setState({...state, phone})}
                left={<TextInput.Icon name="at" />}
              />
              <TextInput
                disabled={!editField}
                mode="outlined"
                label="Endereço"
                placeholder="Brasília"
                value={state.address}
                onChangeText={address => setState({...state, address})}
                left={<TextInput.Icon name="at" />}
              />
            </View>
          ) : null}
          {newClient || editable ? (
            <>
              <View style={styles.closeButton}>
                <IconButton
                  icon="close-circle"
                  size={50}
                  onPress={() => {
                    setNewClient(false);
                    setEditable(false);
                    setEditField(false);
                    if (newClient) setState({});
                  }}
                />
              </View>
              <View style={styles.checkButton}>
                <IconButton
                  icon="check-circle"
                  size={50}
                  onPress={() => {
                    console.log('entrou');
                    setNewClient(false);
                    setEditable(false);
                    setEditField(false);
                    if (newClient) saveClient();
                    if (!newClient) updateClient();
                  }}
                />
              </View>
            </>
          ) : null}
          {!newClient && Object.keys(state).length === 0 ? (
            <View style={styles.addButton}>
              <IconButton
                icon="plus-circle"
                size={50}
                onPress={() => {
                  setNewClient(true);
                  setState({});
                  setSearch('');
                  setEditField(true);
                }}
              />
            </View>
          ) : null}
          {Object.keys(state).length > 0 && !editable && !newClient ? (
            <View style={styles.createButtons}>
              <IconButton
                icon="restore"
                size={50}
                onPress={() => {
                  initialState();
                }}
              />
              <IconButton
                icon="pencil-circle"
                size={50}
                onPress={() => {
                  setEditable(true);
                  setEditField(true);
                  // setState({})
                }}
              />
            </View>
          ) : null}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchView: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
  },
  content: {
    width: '80%',
    padding: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButtons: {
    flex: 1,
    position: 'absolute',
    flexDirection: 'row',
    bottom: 25,
    height: 50,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 10,
  },
  closeButton: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
