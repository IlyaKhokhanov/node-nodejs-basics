import { env } from 'node:process';

const parseEnv = () => {
    let str = '';
    Object.entries(env).forEach(([key, value]) => {
        if (key.startsWith('RSS_')) {
            str += `${key}=${value}; `;
        }
    })
    return console.log(str);
};

parseEnv();