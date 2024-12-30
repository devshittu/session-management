import Axios, { AxiosResponse } from 'axios';
import { NotificationType, notificationsStore } from '@/stores/notifications';
import { AuthStore } from '@/stores/auth';
import {
  URI_AUTH_LOGOUT,
  URI_AUTH_TOKEN_REFRESH,
} from '@/config/api-constants';
import getConfig from 'next/config';
import { handleLogoutAndRedirect, handleTokenRefresh } from '@/utils';
import { ErrorCode } from '@/config/error-codes';
import logger from '@/utils/logger';
// import { auth } from '@/auth';
import nookies from 'nookies';
import { signOut } from 'next-auth/react';
// import { useRouter } from 'next/navigation';

// Use the correct url depending on if it's server or public

const apiUrl =
  typeof window === 'undefined'
    ? process.env.NEXT_SERVER_API_URL
    : process.env.NEXT_PUBLIC_API_URL;

// Ensure that apiUrl is available
if (!apiUrl) {
  throw new Error('API URL is not defined');
}

export const apiClient = Axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  requiresAuth: false,

  // Add withCredentials here if you want it to be the default for all requests
  // withCredentials: true,
});

apiClient.interceptors.request.use(
  async (config) => {
    if (typeof window !== 'undefined') {
      // Get all cookies using nookies
      const allCookies = nookies.get(null);
      const accessToken = allCookies['__Dev-mediaapp.access-token'];

      if (accessToken && config.requiresAuth) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }

      // if (config.requiresAuth) {
      //   // Check if requiresAuth flag is set
      //   // Ensure this only runs in the browser
      //   try {
      //     // const session = await auth();  // Fetch the session client-side
      //     // console.log(`From the fetchClient ${JSON.stringify(session.accessToken)}`);

      //     // if (session?.accessToken) {
      //     //   config.headers['Authorization'] = `Bearer ${session.accessToken}`;
      //     // }
      //   } catch (error) {
      //     console.error('Error fetching session for authorization', error);
      //     // Handle the error if session fetching fails
      //   }
      // }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor (if needed)
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  async (error) => {
    const originalRequest = error.config;
    const errorCode = error.response?.data?.error?.code;
    // const router = useRouter();

    // Handle specific error code 'token_not_provided'
    if (errorCode === ErrorCode.TokenNotProvided) {
      // If the error is not from the refresh token or logout endpoints
      console.log('when code is:', errorCode, error.response); // Check for specific token errors and sign out

      await signOut({});
      // router.push('/auth/signin');
    }
    // Handle response errors here
    return Promise.reject(error);
  },
);

//Path: src/lib/api-client.ts

// apiClient.interceptors.request.use((config) => {
// if (config.requiresAuth) {
//   // Check if requiresAuth flag is set
//   const token = AuthStore.getState().accessToken;
//   if (token) {
//     config.headers['Authorization'] = `Bearer ${token}`;
//   }
//   // Set withCredentials for requests that require authentication
//   config.withCredentials = true;
// }
//   return config;
// });

// apiClient.interceptors.response.use(
//   (response) => response.data,
//   async (error) => {
//     const originalRequest = error.config;
//     const errorCode = error.response?.data?.error?.code;

//     // Check if the URL contains the path for refresh token and logout endpoints
//     const isRefreshTokenUrl = originalRequest.url.includes(
//       URI_AUTH_TOKEN_REFRESH,
//     );
//     const isLogoutUrl = originalRequest.url.includes(URI_AUTH_LOGOUT);

//     // Handle specific error code 'token_not_provided'
//     if (errorCode === ErrorCode.TokenNotProvided) {
//       // If the error is not from the refresh token or logout endpoints
//       if (!isRefreshTokenUrl && !isLogoutUrl) {
//         // Quietly refresh the token and retry the original request
//         return handleTokenRefresh(originalRequest);
//       } else {
//         // If the error is from the refresh token or logout endpoints, handle logout
//         handleLogoutAndRedirect();
//         return Promise.reject(error);
//       }
//     }

//     // Prevent retrying the refresh token and logout endpoints
//     if (isRefreshTokenUrl || isLogoutUrl) {
//       console.error(
//         `isRefreshTokenUrl || isLogoutUrl: stop redirecting to ${'another page'}`,
//       );
//       if (errorCode === ErrorCode.TokenNotProvided) {
//         console.log('authdebug: Token not provided');
//       }

//       return Promise.reject(error);
//     }

//     // Check for expired access token error code
//     // if code is "invalid_access_token" access token is invalid, return then retry refresh the token it means it is expired

//     // Check for the error code
//     // if the code returned is "auth_credential_not_provided",
//     // it means the access token was not provided
//     // then try using the refresh token to get a new access and retry
//     // only after then and it is unsuccessful then,
//     //redirect to the '/' for user name and password input from the user.
//     // Provide helpful message

//     // Check for expired or invalid access token error code
//     if (
//       (errorCode === ErrorCode.InvalidAccessToken ||
//         errorCode === ErrorCode.AuthCredentialNotProvided) &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true; // Set the retry flag
//       return handleTokenRefresh(originalRequest);
//     }

//     // Check for refresh token error code
//     // if the code returned is "token_not_provided",
//     // it means the refresh token was not provided
//     // then redirect to the '/' for user name and password input from the user.
//     // Provide helpful message
//     // If it's a retry and still fails, or if the token was not provided, handle the error without retrying

//     if (originalRequest._retry || errorCode === ErrorCode.TokenNotProvided) {
//       handleLogoutAndRedirect();
//       return Promise.reject(error);
//     }

//     let message = error.response?.data?.message || error.message;

//     // Check for status code 400 and specific error structure
//     if (
//       error.response &&
//       error.response.status === 400 &&
//       error.response.data.error &&
//       error.response.data.error.detail
//     ) {
//       message = error.response.data.error.detail[0];
//     }

//     notificationsStore.getState().showNotification({
//       type: NotificationType.ERROR,
//       title: 'Error',
//       duration: 5000,
//       message,
//     });
//     if (error.response?.data) {
//       return Promise.reject(error.response.data);
//     }
//     return Promise.reject(error);
//   },
// );

//Path: src/lib/api-client.ts
