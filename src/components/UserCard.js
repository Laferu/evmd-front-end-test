import React from 'react'
import {
  View, Text, StyleSheet, Image, TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'

const UserCard = ({
  name, email, age, picture, onPress,
}) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: picture }}
        style={styles.image}
      />
    </View>
    <View>
      <Text>{`${name}, ${age}`}</Text>
      <Text>{email}</Text>
    </View>
  </TouchableOpacity>
)

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  age: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#e5e5e5',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    borderColor: '#e9e9e9'
  },
  imageContainer: {
    marginRight: 20
  },
  image: {
    borderRadius: 5,
    width: 50,
    height: 50
  }
})

export default UserCard
