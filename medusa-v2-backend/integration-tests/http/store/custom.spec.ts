import { medusaIntegrationTestRunner } from "@medusajs/test-utils"

jest.setTimeout(60 * 1000)

medusaIntegrationTestRunner({
  inApp: true,
  env: {},
  testSuite: ({ api }) => {
    describe("Custom store route", () => {
      it("should return 200 on GET /store/custom", async () => {
        const response = await api.get('/store/custom')
        expect(response.status).toEqual(200)
      })
    })
  },
})
