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

const validEmail = "Ahmedayousof9@gmail.com";

export default class Forgot extends Component {
  state = {
    email: "",
    errors: [],
    loading: false
  };

  handleForgot() {
    const { navigation } = this.props;
    const { email } = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });
    setTimeout(() => {
      if (email !== validEmail) {
        errors.push("email");
      }

      this.setState({ errors, loading: false });

      if (!errors.length) {
        Alert.alert("Password sent!", "Check your email", [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("Login");
            }
          }
        ]);
      } else {
        Alert.alert(
          "Error!",
          "Check your Email Address",
          [
            {
              text: "Try Again"
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
      <KeyboardAvoidingView style={styles.forgot} behavior="padding">
        <Block padding={[0, theme.sizes.base * 2]}>
          <Text h1 bold>
            Forgot
          </Text>
          <Block middle>
            <Input
              label="Email"
              error={hasErrors("email")}
              style={(styles.input, hasErrors("email"))}
              onChangeText={text => this.setState({ email: text })}
            />

            <Button gradient onPress={() => this.handleForgot()}>
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
  forgot: {
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
