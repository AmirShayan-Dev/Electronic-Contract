import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const apiUrl = 'https://econtract.irsign.com';

const isAuthenticated = () => {
  return AsyncStorage.getItem('access_token') !== null;
};

const handleSignOut = () => {
  AsyncStorage.removeItem('access_token');
};

const token =
  'bearer ' +
  (AsyncStorage.getItem('access_token') == null
    ? ''
    : AsyncStorage.getItem('access_token'));

export const defaultConfig = {
  notifyMessage: false,
  consoleMessage: false,
  headers: {
    Authorization: isAuthenticated() ? token : '',
  },
};

const HandleError = (error, notifyMessage) => {
  switch (error.status) {
    case 400:
      console.log(error.data['message']);
      Alert.alert(
        "error",
        error.data['message'],
        [
          {
            text: 'OK',
            onPress: () => console.log('OK'),
            style: 'cancel',
          },
        ],
        { cancelable: false }
      );

      break;
    case 500:
      console.log('سرور به مشکل خورده است، دوباره امتحان کنید.');
      console.log(error);
      Alert.alert(
        "error",
        error.data['message'],
        [
          {
            text: 'OK',
            onPress: () => console.log('OK'),
            style: 'cancel',
          },
        ],
        { cancelable: false }
      );
      break;
    case 403:
      console.log(error.data);
      Alert.alert(
        error.data['ErrorCode'],
        error.data['message'],
        [
          {
            text: 'OK',
            onPress: () => console.log('OK'),
            style: 'cancel',
          },
        ],
        { cancelable: false }
      );
      break;
    case 401:
      handleSignOut();
      // window.location.href = "/"
      break;
    default:
      console.log(error.data);
      Alert.alert(
        error.data['ErrorCode'],
        error.data['message'],
        [
          {
            text: 'OK',
            onPress: () => console.log('OK'),
            style: 'cancel',
          },
        ],
        { cancelable: false }
      );
      break;
  }
};

const apiClientBaseRequest = (url, config = defaultConfig, method) => {
  return new Promise((resolve, reject) => {
    axios({
      ...defaultConfig,
      method: method,
      url: apiUrl + url,
      ...config,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        if (error.response) {
          HandleError(error.response, config.notifyMessage);
          if (config.consoleMessage) console.log(error.response);
          reject(error.response);
        } else {
          console.log('سرور به مشکل خورده است، دوباره امتحان کنید.');
          console.log(error);
        }
      });
  });
};

class ApiClient {
  get(url, config = defaultConfig) {
    return apiClientBaseRequest(url, config, 'get');
  }

  post(url, config = defaultConfig) {
    return apiClientBaseRequest(url, config, 'post');
  }

  put(url, config = defaultConfig) {
    return apiClientBaseRequest(url, config, 'put');
  }

  patch(url, config = defaultConfig) {
    return apiClientBaseRequest(url, config, 'patch');
  }

  delete(url, config = defaultConfig) {
    return apiClientBaseRequest(url, config, 'delete');
  }
}

export const apiClient = new ApiClient();
