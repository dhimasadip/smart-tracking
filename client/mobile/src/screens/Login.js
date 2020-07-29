import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, View } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Icon, Input, IconRegistry, Button, Text, Spinner } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/actions/userAction';
import { useNavigation } from '@react-navigation/native';

const AlertIcon = (props) => (
    <Icon {...props} name='alert-circle-outline' />
);

const LoadingIndicator = (props) => (
    <View style={[props.style, styles.indicator]}>
        <Spinner size='small' />
    </View>
);

export default () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const user = useSelector(state => state.userReducer.user)
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const renderIcon = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
        </TouchableWithoutFeedback>
    );

    const loginHandler = () => {
        dispatch(login({ email, password }))
        setLoading(true)
        if (user) {
            navigation.navigate('Home')
        }
    }

    return (
        <>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={eva.dark}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                >
                    <Layout style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
                        <Layout>
                            <Text category="h1">Hello.</Text>
                            <Text category="h1">Welcome Back.</Text>
                        </Layout>
                        <Layout style={{ justifyContent: 'center', width: '80%', height: '50%' }}>
                            <Input
                                style={{ marginBottom: 10 }}
                                placeholder='email'
                                label='Email'
                                value={email}
                                onChangeText={nextValue => setEmail(nextValue)}
                            />
                            <Input
                                style={{ marginBottom: 10 }}
                                value={password}
                                label='Password'
                                placeholder='Password'
                                caption='Should contain at least 8 characters'
                                accessoryRight={renderIcon}
                                captionIcon={AlertIcon}
                                secureTextEntry={secureTextEntry}
                                onChangeText={nextValue => setPassword(nextValue)}
                            />
                            {
                                loading &&
                                <Button appearance='outline' accessoryLeft={LoadingIndicator}>
                                    LOADING
                                </Button>
                            }
                            {
                                !loading &&
                                <Button appearance='filled' onPress={loginHandler}>
                                    Login
                                </Button>

                            }
                        </Layout>
                    </Layout>
                </KeyboardAvoidingView>
            </ApplicationProvider>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    indicator: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
