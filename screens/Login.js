import React, { Component } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  ActivityIndicator
} from "react-native";
import { Block, Button, Text, Input } from "../components";
import { theme } from "../constants";
const validEmail = "user@gmail.com";
const validPassword = "123456";
export default class Login extends Component {
  state = {
    email: validEmail,
    password: validPassword,
    errors: [],
    loading: false
  };

  handleLogin() {
    const { navigation } = this.props;
    const { email, password } = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });
    setTimeout(() => {
      if (email !== validEmail) {
        errors.push("email");
      }

      if (password !== validPassword) {
        errors.push("password");
      }

      this.setState({ errors, loading: false });

      if (!errors.length) {
        navigation.navigate("Browse");
      }
    }, 1000);
  }

  render() {
    const { loading, errors } = this.state;
    const { navigation } = this.props;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);
    return (
      <KeyboardAvoidingView style={styles.login} behavior="padding">
        <Block padding={[0, theme.sizes.base * 2]}>
          <Text h1 bold>
            Login
          </Text>

          <Block middle>
            <Input
              label="Email"
              error={hasErrors("email")}
              style={(styles.input, hasErrors("email"))}
              defaultValue={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
            <Input
              secure
              label="Password"
              error={hasErrors("password")}
              style={(styles.input, hasErrors("password"))}
              defaultValue={this.state.password}
              onChangeText={text => this.setState({ password: text })}
            />
            <Button gradient onPress={() => this.handleLogin()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text blod white center>
                  Login
                </Text>
              )}
            </Button>

            <Button
              onPress={() => {
                navigation.navigate("Forgot");
              }}
            >
              <Text
                center
                gray
                caption
                style={{ textDecorationLine: "underline" }}
              >
                Forget your password?
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  login: {
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
