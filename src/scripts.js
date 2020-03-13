// Local dependencies.
import { importAll } from './utils';

importAll(require.context('./blocks', true, /script\.js$/));