import fs from 'fs';

export const config = JSON.parse(fs.readFileSync('config.json', { encoding: 'utf-8' })) as Config;
