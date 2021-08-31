import _ from "lodash"
import Vuex from "vuex"
import { createLocalVue } from "@vue/test-utils"

describe("store/apiUsers", () => {
// ----------------------------------------------------
// focus on the code from here...
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let NuxtStore;
  let store;

  beforeAll(async () => {
    // note the store will mutate across tests
    const storePath = `${process.env.buildDir}/store.js`
    NuxtStore = await import(storePath)
  })

  beforeEach(async () => {
    store = await NuxtStore.createStore()
  })
// ...to here is what matters
// ----------------------------------------------------

  describe("allItems", () => {
    let allItems

    beforeEach(() => {
      allItems = store.getters['apiUsers/allItems']
    })

    test("getter is a function", () => {
      expect(_.isArray(allItems)).toBe(true)
    })

    test("should be 6 movies total", () => {
      expect(allItems.length).toBe(0)
    })
  })

  // describe('byStudio', () => {
  //   let byStudio
  //
  //   beforeEach(() => {
  //     byStudio = store.getters['movies/byStudio']
  //   })
  //
  //   test('is a function', () => {
  //     expect(_.isFunction(byStudio)).toBe(true)
  //   })
  //
  //   test('matches what the disney getter returns', () => {
  //     const movies = store.getters['movies/byStudio']('Disney')
  //     const disney = store.getters['movies/disney']
  //     expect(movies).toEqual(disney)
  //   })
  //
  //   test('shows all other studios with one entry each', () => {
  //     expect(byStudio('sony').length).toBe(1)
  //     expect(byStudio('warner bros.').length).toBe(1)
  //     expect(byStudio('universal').length).toBe(1)
  //     expect(byStudio('beijing enlight').length).toBe(1)
  //   })
  // })
})
