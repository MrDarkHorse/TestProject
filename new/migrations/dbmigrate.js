import Postgrator from 'postgrator'

const postgrator = new Postgrator({
  // Directory containing migration files
  migrationDirectory: __dirname + '/sql',
  // Driver: must be pg, mysql, mysql2 or mssql
  driver: 'mysql',
  // Database connection config
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  // Schema table name. Optional. Default is schemaversion
  // If using Postgres, schema may be specified using . separator
  // For example, { schemaTable: 'schema_name.table_name' }
  schemaTable: 'schemaversion'
})

// Migrate to max version (optionally can provide 'max')
postgrator
  .migrate()
  .then(appliedMigrations => console.log(appliedMigrations))
  .catch(error => console.log(error))