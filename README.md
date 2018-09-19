# React Native & DevLess BaaS (Authentication)
Connecting React Native App to DevLess backend. [Read more about DevLess here](https://devless.io)

## Dependencies
1. [Expo](https://expo.io)
2. [React Navigation](https://reactnavigation.com)

## Setup
1. Set up your DevLess instance using our one-click deploy to [Heroku](https://dashboard.heroku.com/new?template=https://github.com/DevlessTeam/DV-PHP-CORE/tree/heroku3)
2. Login into your DevLess instance, head to the App section to grab the instance details to config the `devless.js` located in the `utils` directory
```javascript
const url = 'YOUR_DEVLESS_URL';
const header = {
  'content-Type': 'application/json',
  'devless-token': 'YOUR_DEVLESS_TOKEN',
};
```

## Usage
Follow React Navigation to setup Switch Navigator for your Auth Flow (https://reactnavigation.org/docs/en/auth-flow.html)

Import the Devless library into the component you would like to access it
```javascript
import Devless from '../utils/devless'
```
Write a function to handle login button pressed
```javascript
_handleLogin = async () => {
    await Devless.login({
      email: this.state.email,
      password: this.state.password
    }).then(res => {
      //Response from API returns the user profile details else returns false
      if (res) {
        // Handle the successful response here and proceed to switch to the other screens
        this.props.navigation.navigate("Main");
        return;
      }
      alert("Invalid login credentials");
    });
  };
```
Sample implementation for `LoginScreen.js`. Explore the repo for further implementation
```javascript
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
        // Handle the successful response here and proceed to switch to the other screens
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
```
Sample implement for RegisterScreen
```javascript
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
```

### For CRUD Options
Refer to [JS Library](https://github.com/DevlessTeam/DV-JS-SDK) for more options
1. Query Data
```javascript
import Devless from '../utils/devless'

Devless.queryData('service_name', 'table_name', extras_params={})
  .then(res => console.log(res))
  .catch(e => console.log(e))
```
The `extras_params` can be ignored if not available.

2. Add Data
import Devless from '../utils/devless'

```javascript
let data = {
  name: 'Tsatsu'
}
Devless.addData('service_name', 'table_name', data)
  .then(res => console.log(res))
  .catch(e => console.log(e))
```

3. Update Data
import Devless from '../utils/devless'

```javascript
let data = {
  name: 'Tsatsu'
}
Devless.updateData('service_name', 'table_name', 'identifier', 'value', data)
  .then(res => console.log(res))
  .catch(e => console.log(e))
```

4. Delete Data
import Devless from '../utils/devless'

```javascript
Devless.updateData('service_name', 'table_name', 'identifier', 'value')
  .then(res => console.log(res))
  .catch(e => console.log(e))
```

5. Method Calls
import Devless from '../utils/devless'

```javascript
let params = []
Devless.call('service_name', 'method_name', params)
  .then(res => console.log(res))
  .catch(e => console.log(e))
```
`params` can be ignored if not available

6. Login
```javascript
import Devless from '../utils/devless'

let payload = {
  email: 'john@doe.com'
  password: '******'
}

Devless.login(payload)
  .then(res => console.log(res))
  .catch(e => console.log(e))
```

7. Register
```javascript
import Devless from '../utils/devless'

let payload = {
  first_name: 'John',
  last_name: 'Doe',
  phone_number: '233201234567',
  email: 'john@doe.com'
  password: '******'
}

Devless.register(payload)
  .then(res => console.log(res))
  .catch(e => console.log(e))
```
8. Logout
```javascript
import Devless from '../utils/devless'

let token = 'LOGGED_IN_USER_TOKEN'

Devless.logout(token)
  .then(res => console.log(res))
  .catch(e => console.log(e))
```

## To-Do
1. Implement profile screen
2. Implement returning user flow
3. Implement log out

## Contribution
Submit PRs. Test & Improvements needed.

E-mail: [tsatsu@devless.io](mailto:tsatsu@devless.io)
