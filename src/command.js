import { exit } from 'shelljs';
import { program } from 'commander';
import config from './config/index.js';

import mongoose from 'mongoose';
import AddUser from './presentation/commands/addUser.js';

void (async() => {
  try {
    await mongoose.connect(config.dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    program.addCommand(AddUser);
    await program.parseAsync(process.argv);

    exit();
  }
 catch (error) {
    console.log(error);
    exit();
  }
})();
