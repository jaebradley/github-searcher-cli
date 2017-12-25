/* eslint-disable no-console */

import AuthorizationPersister from '../AuthorizationPersister';
import {
  getLoginCredentials,
  deleteExistingAuthorization,
  saveNewAuthorization,
} from './SetupService';
import {
  Success,
  Failure,
} from '../../data/constants/setup/Message';

const executeSetup = async () => {
  try {
    const { username, password } = await getLoginCredentials();

    const authorizationPersister = new AuthorizationPersister(username, password);
    await deleteExistingAuthorization(authorizationPersister);
    await saveNewAuthorization(authorizationPersister);
    console.log(Success);
  } catch (e) {
    console.error(Failure);
  }
};

export default executeSetup;
