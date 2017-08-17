// Модулёчек для населения БД. Например, с консоли

import db from './connectors';
import seedDb from './seedDb';

seedDb(db);