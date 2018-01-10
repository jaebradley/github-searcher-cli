import GitHubDataStorer from './GitHubDataStorer';
import executeSetup from './setup/executeSetup';

const getData = async () => {
  const authorizationToken = await GitHubDataStorer.getAuthorizationToken();
  const username = await GitHubDataStorer.getUsername();
  const password = await GitHubDataStorer.getPassword();
  const authorizationId = await GitHubDataStorer.getAuthorizationId();
  return {
    authorizationToken,
    username,
    password,
    authorizationId,
  };
};

const getUserIdentityData = async () => {
  let data = await getData();

  if (!data.authorizationToken || !data.username || !data.password || !data.authorizationId) {
    await executeSetup();
    data = await getData();

    return data;
  }

  return data;
};

export { getUserIdentityData, getData };
