import {
  AsyncStorage
} from 'react-native';

/* SDK to interact with DevLess */
const url = 'YOUR_DEVLESS_URL';

const header = {
  'Content-Type': 'application/json',
  'devless-token': 'YOUR_DEVLESS_TOKEN',
};

var nonce = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var requestHandler = (hostUrl, method, data) => {

  return fetch(hostUrl, {
      method,
      headers: header,
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(responseJSON => {
      return responseJSON;
    })
    .catch(e => console.log('error ', e));
};

const Devless = {
  queryData(service, table, params = null) {
    let parameters = '';

    if (params !== null) {
      let innerParams = function (key, params) {
        for (var eachParam in params) {
          parameters = '&' + key + '=' + params[eachParam] + parameters;
        }
      };

      for (var key in params) {
        if (!params.hasOwnProperty(key)) {
          /**/
        }
        if (params[key] instanceof Array) {
          innerParams(key, params[key]);
        } else {
          parameters = '&' + key + '=' + params[key] + parameters;
        }
      }
    }

    return fetch(`${url}${service}/db?table=${table}${parameters}`, {
        method: 'GET',
        headers: header,
      })
      .then(response => response.json())
      .then(responseJSON => {
        return responseJSON;
      });
  },

  addData(service, table, data) {
    return fetch(`${url}/api/v1/service/${service}/db`, {
        method: 'POST',
        headers: header,
        body: JSON.stringify({
          resource: [{
            name: table,
            field: [data],
          }, ],
        }),
      })
      .then(response => response.json())
      .then(responseJSON => {
        return responseJSON;
      });
  },

  updateData(service, table, identifier, value, data) {
    return fetch(`${url}/api/v1/service/${service}/db`, {
        method: 'PATCH',
        headers: header,
        body: JSON.stringify({
          resource: [{
            name: table,
            params: [{
              where: identifier + ',' + value,
              data: [data],
            }, ],
          }, ],
        }),
      })
      .then(response => response.json())
      .then(responseJSON => {
        return responseJSON;
      });
  },

  deleteData(service, table, identifier, value) {
    return fetch(`${url}/api/v1/service/${service}/db`, {
        method: 'PATCH',
        headers: header,
        body: JSON.stringify({
          resource: [{
            name: table,
            params: [{
              delete: true,
              where: `${identifier},${value}`,
            }, ],
          }, ],
        }),
      })
      .then(response => response.json())
      .then(responseJSON => {
        return responseJSON;
      });
  },

  call: async (service, method, data = []) => {
      const body = {
        jsonrpc: '2.0',
        method: service,
        id: nonce(1, 10000000),
        params: data,
      };

      const hostUrl = `${url}/api/v1/service/${service}/rpc?action=${method}`;

      let res = await requestHandler(hostUrl, 'POST', body);

      return res;
    },

    setToken(token) {
      header['devless-user-token'] = token;
      AsyncStorage.setItem('token', token);
    },

    getToken: async () => {
        let token = await AsyncStorage.getItem('token');
        return token;
      },

      login: async payload => {
          return await Devless.call('devless', 'login', [
            payload.username || null,
            payload.email || null,
            payload.phone_number || null,
            payload.password,
          ]).then(res => {
            if (res.payload.result) {
              Devless.setToken(res.payload.result.token);
              AsyncStorage.setItem('token', `${res.payload.result.token}`);
              return res.payload.result.profile;
            }
            return false;
          });
        },

        register: async (payload, extras) => {
            return await Devless.call('devless', 'signUp', [
              payload.email || null,
              payload.password,
              payload.username || null,
              payload.phone_number || null,
              payload.first_name || null,
              payload.last_name || null,
              '',
              '',
              extras || null,
            ]).then(res => {
              if (res.payload.result) {
                Devless.setToken(res.payload.result.token);
                AsyncStorage.setItem('token', `${res.payload.result.token}`);
                return res.payload.result.profile;
              }
              return false;
            });
          },

          logout: async () => {
              Devless.setToken(await Devless.getToken());
              return await Devless.call('devless', 'logout').then(res => {
                if (res.payload.result) {
                  return true;
                }
                return false;
              });
            },

            getProfile: async () => {
                let token = await Devless.getToken();
                if (token) {
                  Devless.setToken(token);
                  return await Devless.call('devless', 'profile').then(res => {
                    if (res.payload.result) {
                      return res;
                    }
                    return false;
                  });
                }
                return false;
              },

              updateProfile: async payload => {
                Devless.setToken(await Devless.getToken());
                return await Devless.call('devless', 'updateProfile', [
                  payload.email,
                  payload.password,
                  payload.username,
                  payload.phone_number,
                  payload.first_name,
                  payload.last_name,
                  '',
                  payload.extras || null,
                ]).then(res => {
                  if (res.payload.result) {
                    return res;
                  }
                  return false;
                });
              },
};

export default Devless;