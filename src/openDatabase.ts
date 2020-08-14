import { createTestDB } from './database'
beforeAll(async () => {
  global.db = await createTestDB()
})
afterAll(async () => {
  await global.db.connection.end()
})
