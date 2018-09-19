import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import Devless from "../utils/devless";

export default class LoginScreen extends Component {
  state = {
    email: "",
    password: ""
  };

  _handleLogin = async () => {
    await Devless.login({
      email: this.state.email,
      password: this.state.password
    }).then(res => {
      //Response from API returns the user profile details else returns false
      if (res) {
        this.props.navigation.navigate("Main");
        return;
      }
      alert("Invalid login credentials");
    });
  };

  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
        style={{
          backgroundColor: "#2980b6",
          paddingVertical: 10,
          paddingHorizontal: 10,
          marginRight: 10
        }}
      >
        <Text style={{ color: "white", fontWeight: "500" }}>Register</Text>
      </TouchableOpacity>
    )
  });

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Login to access the app</Text>
        <TextInput
          style={styles.input}
          keyboardType={"email-address"}
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
        />
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this._handleLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  label: {
    textAlign: "center",
    marginTop: 80,
    marginBottom: 50
  },
  input: {
    height: 40,
    backgroundColor: "rgba(225,225,225,0.2)",
    marginBottom: 10,
    padding: 10
  },
  buttonContainer: {
    backgroundColor: "#2980b6",
    paddingVertical: 15
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700"
  }
});
