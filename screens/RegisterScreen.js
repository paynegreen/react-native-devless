import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import Devless from "../utils/devless";

export default class RegisterScreen extends Component {
  state = {
    email: "",
    first_name: "",
    last_name: "",
    password: ""
  };

  _handleRegister = async () => {
    await Devless.register({
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password
    }).then(res => {
      //Response from API returns the user profile details else returns false
      if (res) {
        // User token is stored in Core data. That can be used to access authenticated endpoints
        // or to retrieve user profile details
        this.props.navigation.navigate("Main");
        return;
      }
      alert("Unable to signup users. Please try again");
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Register to access the app</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          onChangeText={first_name => this.setState({ first_name })}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          onChangeText={last_name => this.setState({ last_name })}
        />
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
          onPress={this._handleRegister}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
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
