// databaseConfig.test.js
const databaseConfig = require('../database');

describe('databaseConfig', () => {
  it('should return development configuration', () => {
    process.env.ENV = 'dev';
    const config = databaseConfig();
    expect(config).toEqual({
      dialect: 'mysql',
      host: 'localhost',
      timezone: '-03:00',
      port: 3306,
      username: 'root',
      password: '',
      database: 'salao'
    });
  });

  it('should return production configuration', () => {
    process.env.ENV = 'production';
    process.env.USER = 'your_production_username';
    process.env.PASSWORD = 'your_production_password';

    const config = databaseConfig();
    expect(config).toEqual({
      dialect: 'mysql',
      host: 'database-portfolio.caa9x9ctigzd.us-east-1.rds.amazonaws.com',
      timezone: '-03:00',
      port: 3306,
      username: 'your_production_username',
      password: 'your_production_password',
      database: 'salao'
    });
  });
});
