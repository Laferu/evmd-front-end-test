import React, { useState, useEffect, useContext } from 'react'
import * as SQLite from 'expo-sqlite'
import {
  View, Image, StyleSheet, Text, TouchableOpacity
} from 'react-native';
import { GlobalContext } from '../../../Context'

const Details = () => {
  const context = useContext(GlobalContext)
  const db = SQLite.openDatabase(context.state.DB_NAME)
  const [dataUser, setDataUser] = useState({})

  useEffect(() => {
    const fun = () => {
      db.transaction(tx => {
        tx.executeSql(
          `select * from users where _id='${context.state.dataId}'`,
          null,
          ({}, e) => setDataUser(e.rows._array[0])
        )
      })
    }
    
    fun()
  }, [])

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{
            uri: dataUser.picture,
          }}
          style={styles.image}
        />
      </View>
      <View
        style={styles.detailsContainer}
      >
        <Text>Nome: {dataUser.name}</Text>
        <Text>E-mail: {dataUser.email}</Text>
        <Text>Idade: {dataUser.age}</Text>
        <Text>Salário: R$ {dataUser.balance}</Text>
        <Text>Latitude: {dataUser.latitude}</Text>
        <Text>Longitude: {dataUser.longitude}</Text>
      </View>
      <TouchableOpacity
        style={dataUser.favorite === 1 ? {...styles.button, backgroundColor: '#ffd700'} : styles.button}
        onPress={
          () => {
            const favorite = dataUser.favorite === 0 ? 1 : 0
            db.transaction(tx => {
              tx.executeSql(
                `UPDATE users SET favorite = ${favorite} WHERE _id='${context.state.dataId}'`,
              )
            })
            setDataUser({...dataUser, favorite: favorite})
          }
        }
      >
        <Text>
          Favorito
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f3f3f3'
  },
  detailsContainer: {
    width: '100%',
    borderRadius: 5,
    padding: 10,
    marginTop: 15,
    backgroundColor: '#e5e5e5'
  },
  image: {
    width: 200,
    height: 200
  },
  button: {
    borderRadius: 5,
    padding: 10,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#b1b1b1',
    backgroundColor: '#e5e5e5'
  },
  buttonActive: {
    backgroundColor: '#ffd700'
  }
})

export default Details
