import fs from 'fs';
import { Config } from './common/config';

export const config = JSON.parse(fs.readFileSync('config.json', { encoding: 'utf-8' })) as Config;
