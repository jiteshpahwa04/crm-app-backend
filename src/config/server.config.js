import dotenv from 'dotenv';
dotenv.config();

const SERVER_CONFIG = {
    PORT : process.env.PORT || 3000,
}

export default SERVER_CONFIG;