import mysql from 'mysql2/promise'
import { test } from '../database.json'
import DBMigrate from 'db-migrate'
import * as R from 'ramda'
import { Database } from '../typings'
const testConfig = R.omit(['driver'])(test) // mysql2 does not like unknown props in its config. For whatever reason...

export const createTestDB = async (): Promise<Database> => {
  const connection = await mysql.createConnection(testConfig)
  const migration = DBMigrate.getInstance(true, { env: 'test' })
  migration.silence(true)
  return {
    connection,
    migration,
  }
}
