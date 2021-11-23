import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Recipe() {

  return (
    <View style={styles.container}>
        <Text>Your recipe</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    margin: 12,
  },
});