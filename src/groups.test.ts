import { assert } from 'chai'
import * as R from 'ramda'
import { createTestDB, Database } from './database'

describe('Manage groups', () => {
  let db: Database
  beforeAll(async () => {
    db = await createTestDB()
    await db.migration.up()
  })
  afterAll(async () => {
    await db.migration.down()
    await db.connection.end()
  })
  test('Addition and removal', async () => {
    await db.connection.execute<any>(
      sql`INSERT INTO groups (name, floor) VALUES (?,?);`,
      ['Rotkehlchen', '1'],
    )

    assert.deepEqual(
      R.head(await db.connection.execute<any>(sql`SELECT * FROM groups;`)),
      [{ id: 1, name: 'Rotkehlchen', floor: '1' }],
    )
  })
})

const sql = (strings: TemplateStringsArray) => strings.raw[0]
