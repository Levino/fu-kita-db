import { assert } from 'chai'
import * as R from 'ramda'
describe('Parents', () => {
  beforeEach(async () => {
    await global.db.migration.up()
  })

  afterEach(async () => {
    await global.db.migration.reset()
  })

  test('Tests', async () => {
    const [{ insertId: rotkehlchenId }] = await global.db.connection.execute<
      any
    >(sql`INSERT INTO gruppen (name, floor) VALUES (?,?);`, [
      'Rotkehlchen',
      '1',
    ])
    const [{ insertId: peterId }] = await global.db.connection.execute<any>(
      sql`INSERT INTO children (name, gruppe) VALUES (?,?);`,
      ['Peter Pan', rotkehlchenId],
    )
    const [{ insertId: uweId }] = await global.db.connection.execute<any>(
      sql`INSERT INTO parents (name, email) VALUES (?,?);`,
      ['Uwe Ochsenknecht', 'uwe@ochsenknecht.de'],
    )

    await global.db.connection.execute<any>(
      sql`INSERT INTO children_to_parents (parent, child) VALUES (?,?);`,
      [uweId, peterId],
    )

    assert.deepEqual(
      R.head(
        await global.db.connection.execute<any>(
          sql`SELECT p.email FROM children c INNER JOIN children_to_parents cp ON c.id=cp.child INNER JOIN parents p ON cp.parent=p.id WHERE c.name=?;`,
          ['Peter Pan'],
        ),
      ),
      [{ email: 'uwe@ochsenknecht.de' }],
      'Peters E-Mail ist von Uwe.',
    )
  })
})

const sql = (strings: TemplateStringsArray) => strings.raw[0]
