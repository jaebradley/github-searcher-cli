/* eslint-disable no-console */

import CodeSearchCommandService from '../services/code/CodeSearchCommandService';

try {
  CodeSearchCommandService.execute();
} catch (e) {
  console.error(`Rut ro! Unexpected error: ${e}`);
}
