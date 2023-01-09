import { config } from 'dotenv';

import { Zensky } from '../controllers/index';

config();

const zensky = new Zensky();

export default zensky;
