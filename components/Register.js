import React, { useState } from "react";
import { Text, View, TextInput, Alert, TouchableOpacity, ImageBackground, KeyboardAvoidingView } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './Firebase';
import styles from './Styles';

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();

export default function Register({ navigation }) {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    //creates new user if credentials are correct
    const createNewUser = () => {
        try {
            if (email !== '' && password !== '') {
                createUserWithEmailAndPassword(auth, email, password)
                    .then(() => Alert.alert('User Was Created Succesfully'))
                    .then(() => navigation.goBack())
                    .catch(error => {
                        switch (error.code) {
                            case 'auth/email-already-in-use':
                                Alert.alert('Email Already Exists!')
                                break;
                            case 'auth/invalid-email':
                                Alert.alert('Invalid Email!')
                                break;
                            case 'auth/weak-password':
                                Alert.alert('Password Should Be at least 6 Characters!')
                                break;
                        }
                    })
            } else {
                Alert.alert('Credentials Cannot Be Empty')
            }
        } catch (err) {
            alert(err);
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding">
            <ImageBackground source={require('../assets/backround.png')} resizeMode="cover" style={styles.image}>
                <View style={styles.loginView}>
                    <Text style={styles.headerContainer}>Please type in your credentials</Text>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.registerInput}
                            value={email}
                            placeholder="Email"
                            placeholderTextColor="rgb(116, 144, 147)"
                            onChangeText={(email) => setEmail(email)}
                            style={styles.registerInput}
                        />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.registerInput}
                            value={password}
                            placeholder="Password"
                            placeholderTextColor="rgb(116, 144, 147)"
                            secureTextEntry={true}
                            onChangeText={(password) => setPassword(password)}
                            style={styles.registerInput}
                        />
                    </View>
                    <TouchableOpacity onPress={createNewUser} style={styles.button}>
                        <Text>Create user</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
}