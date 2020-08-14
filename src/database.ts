import mysql from 'mysql2/promise'
import { test } from '../database.json'
import DBMigrate from 'db-migrate'
import * as R from 'ramda'
const testConfig = R.omit(['driver'])(test) // mysql2 does not like unknown props in its config. For whatever reason...
export interface Database {
  connection: mysql.Connection
  migration: any
}

export const createTestDB = async () => {
  const connection = await mysql.createConnection(testConfig)
  const migration = DBMigrate.getInstance(true, { env: 'test' })
  migration.silence(true)
  return {
    connection,
    migration,
  }
}
