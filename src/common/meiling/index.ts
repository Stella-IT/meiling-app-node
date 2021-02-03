import axios, { AxiosResponse } from 'axios';
import { config } from '../../';
import { MeilingV1OAuthAccessTokenInfo, MeilingV1OAuthOpenIDData } from './interface';

function handleAxiosError(e: any) {
  const response = e.response as AxiosResponse;
  if (response) {
    return response;
  } else {
    return undefined;
  }
}

async function getUser(accessToken: string) {
  try {
    const data = await axios.get(config.meilingEndpoint + '/v1/oauth2/userinfo', {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    });
    const tokenInfo = data.data as MeilingV1OAuthOpenIDData;

    return tokenInfo;
  } catch (e) {
    return false;
  }
}

async function validateToken(accessToken: string, permissions: string[]) {
  try {
    const data = await axios.get(config.meilingEndpoint + '/v1/oauth2/tokeninfo?access_token=' + accessToken);
    const tokenInfo = data.data as MeilingV1OAuthAccessTokenInfo;
    for (const permission of permissions) {
      if (!tokenInfo.scope.includes(permission)) {
        return false;
      }
    }

    return true;
  } catch (e) {
    return false;
  }
}
