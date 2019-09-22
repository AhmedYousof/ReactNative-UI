import React, { Component } from "react";

import {
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  ActivityIndicator,
  Alert
} from "react-native";
import { Block, Button, Text, Input } from "../components";
import { theme } from "../constants";

export default class SignUp extends Component {
  state = {
    email: "",
    username: "",
    Password: "",
    errors: [],
    loading: false
  };

  handleSignUp() {
    const { navigation } = this.props;
    const { email, username, Password } = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });
    setTimeout(() => {
      if (!email) {
        errors.push("email");
      }
      if (!username) {
        errors.push("username");
      }
      if (!Password) {
        errors.push("password");
      }

      this.setState({ errors, loading: false });

      if (!errors.length) {
        Alert.alert(
          "success!",
          "Your account has been created",
          [
            {
              text: "continue",
              onPress: () => {
                navigation.navigate("Browse");
              }
            }
          ],
          { cancelable: false }
        );
      }
    }, 2000);
  }
  render() {
    const { loading, errors } = this.state;
    const { navigation } = this.props;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);
    return (
      <KeyboardAvoidingView style={styles.signup} behavior="padding">
        <Block padding={[0, theme.sizes.base * 2]}>
          <Text h1 bold>
            SignUp
          </Text>
          <Block middle>
            <Input
              email
              label="Email"
              error={hasErrors("email")}
              style={(styles.input, hasErrors("email"))}
              onChangeText={text => this.setState({ email: text })}
            />
            <Input
              label="Username"
              error={hasErrors("username")}
              style={(styles.input, hasErrors("username"))}
              onChangeText={text => this.setState({ username: text })}
            />
            <Input
              secure
              label="Password"
              error={hasErrors("password")}
              style={(styles.input, hasErrors("password"))}
              onChangeText={text => this.setState({ Password: text })}
            />

            <Button gradient onPress={() => this.handleSignUp()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text blod white center>
                  SignUp
                </Text>
              )}
            </Button>
            <Button
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text
                center
                gray
                caption
                style={{ textDecorationLine: "underline" }}
              >
                Back to Login
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  signup: {
    flex: 1,
    justifyContent: "center"
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
    borderBottomWidth: 1
  }
});
