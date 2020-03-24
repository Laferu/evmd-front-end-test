import React, { useState, useEffect, useContext } from 'react'
import * as SQLite from 'expo-sqlite'
import { View, StyleSheet, FlatList } from 'react-native'
import PropTypes from 'prop-types'
import { GlobalContext } from '../../../Context'

import { UserCard } from '../../components'

const Home = ({ navigation }) => {
  const [dataUsers, setDataUsers] = useState([])
  const context = useContext(GlobalContext)
  const db = SQLite.openDatabase(context.state.DB_NAME)

  useEffect(() => {
    const fun = () => {
      db.transaction(tx => {
        tx.executeSql(
          `select * from users`,
          null,
          ({}, e) => setDataUsers(e.rows._array),
          setDataUsers([])
        )
      })
    }

    fun()
  }, [])

  return (
    <View
      style={styles.container}
    >
      <FlatList
        data={dataUsers}
        renderItem={({ item }) => (
          <UserCard
            name={item.name}
            age={`${item.age}`}
            email={item.email}
            picture={item.picture}
            onPress={() => {
              context.state.setDataId(item._id)
              navigation.navigate('Details')
            }}
          />
        )}
        keyExtractor={item => item._id}
        style={styles.flatStyle}
      />
    </View>
  )
}

Home.propTypes = {
  navigation: PropTypes.oneOfType([PropTypes.object]).isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatStyle: {
    padding: 15
  }
})

export default Home
