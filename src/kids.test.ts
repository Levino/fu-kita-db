import { assert } from 'chai'
import * as R from 'ramda'
describe('Kids', () => {
  beforeEach(async () => {
    await global.db.migration.up()
  })

  afterEach(async () => {
    await global.db.migration.down()
  })

  test('Tests', async () => {
    const [{ insertId: rotkehlchenId }] = await global.db.connection.execute<
      any
    >(sql`INSERT INTO gruppen (name, floor) VALUES (?,?);`, [
      'Rotkehlchen',
      '1',
    ])

    const [{ insertId: sonnenId }] = await global.db.connection.execute<any>(
      sql`INSERT INTO gruppen (name, floor) VALUES (?,?);`,
      ['Sonnen', '3'],
    )
    await global.db.connection.execute<any>(
      sql`INSERT INTO kids (name, gruppe) VALUES (?,?);`,
      ['Peter Pan', rotkehlchenId],
    )
    await global.db.connection.execute<any>(
      sql`INSERT INTO kids (name, gruppe) VALUES (?,?);`,
      ['Uschi Obermeier', sonnenId],
    )

    assert.deepEqual(
      R.head(
        await global.db.connection.execute<any>(
          sql`SELECT gruppen.name FROM kids INNER JOIN gruppen ON kids.gruppe=gruppen.id WHERE kids.name=?;`,
          ['Uschi Obermeier'],
        ),
      ),
      [{ name: 'Sonnen' }],
      'Uschi Obermeier should be a Sonnenkind.',
    )
  })
})

const sql = (strings: TemplateStringsArray) => strings.raw[0]
