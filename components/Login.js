import React, { useState } from "react";
import { Alert, Text, View, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView } from "react-native";
import styles from './Styles';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import firebaseConfig from './Firebase';
import { initializeApp } from 'firebase/app';
import { userInfo, userStore } from './UserReducer';
import { signIn, store } from './SigninReducer';


// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();

export default function Login({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Listen to any changes in 'user' data and set "userReducer's" store to "user.uid"
    //listens to changes in user data 
    const authListener = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                userStore.dispatch(userInfo(uid))
            } else {
                userStore.dispatch(userInfo(''))
            }
        })
    };

    // Login if credentials match existing crendentials and if so, set "signInReducer's" store to "true"
    //logs in the user if credential match existing credentials
    const handleLogin = () => {
        try {
            if (email !== '' && password !== '') {
                signInWithEmailAndPassword(auth, email, password)
                    .then(() => store.dispatch(signIn(true)))
                    .then(() => authListener())
                    .catch(error => {
                        switch (error.code) {
                            case 'auth/user-not-found':
                                Alert.alert('User Not Found!')
                                break;
                            case 'auth/wrong-password':
                                Alert.alert('Incorrect Password!')
                                break;
                            case 'auth/invalid-email':
                                Alert.alert('Invalid Email!')
                                break;
                            case 'auth/too-many-requests':
                                Alert.alert('Too Many Login Attempts. Try again later!')
                                break;
                        }
                    })
            } else {
                Alert.alert('Login Fields Cannot Be Empty')
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
                    <Text style={styles.headerContainer}>Welcome to RecipeApp</Text>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.registerInput}
                            placeholder="Email"
                            placeholderTextColor="rgb(116, 144, 147)"
                            onChangeText={(email) => setEmail(email)}
                        />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.registerInput}
                            placeholder="Password"
                            placeholderTextColor="rgb(116, 144, 147)"
                            secureTextEntry={true}
                            onChangeText={(password) => setPassword(password)}
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text>LOGIN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: "transparent", padding: 20 }} onPress={() => navigation.navigate('Register')}>
                        <Text>No account? Register here</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
}