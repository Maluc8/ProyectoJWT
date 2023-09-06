import config from './config/index.js';
import AppFactory from './presentation/factories/appFactory.js';
import DbFactory from './data/factories/dbFactory.js';

void (async() => {
  const db = DbFactory.create(config.DB);
  db.init(config.dbUri);

  const app = AppFactory.create();
  app.init();
  app.build();
  app.listen();
})();
