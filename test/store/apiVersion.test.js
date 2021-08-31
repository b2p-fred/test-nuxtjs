// import {createLocalVue} from '@vue/test-utils'
import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from 'vuex'


import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';


// ---
import {state, mutations} from '@/store/apiVersion';

// import mockAxios from '../mocks/mock.user';

// import {mapState, mapMutations} from "vuex";

// Axios mock
// jest.mock('axios');
// jest.setMock('axios', mockAxios)
const axiosMock = new MockAdapter(axios);


const localVue = createLocalVue()
localVue.use(Vuex)

// // to use Store
let NuxtStore;
let store;
// let store = new Vuex.Store({
//   modules: {
//     core: {
//       state: {
//         id: 1
//       }
//     }
//   }
// });

jest.mock("@nuxtjs/axios", () => ({
  $get: () => Promise.resolve({ data: [{ val: 1 }] })
}));

// afterEach(() => {
//   // // cleaning up the mess left behind the previous test
//   // mockAxios.reset();
// });
//
beforeAll(async () => {
  // note the store will mutate across tests
  const storePath = `${process.env.buildDir}/store.js`;
  NuxtStore = await import(storePath);
});

beforeEach(async () => {
  store = await NuxtStore.createStore();
  // console.log("store:", store)
});

// describe('apiVersion - mutations', () => {
//   test('getAllRequest', () => {
//     // apply mutation
//     // console.log("store:", store.state.apiUsers)
//     store.commit('apiUsers/getAllRequest');
//     // assert result
//     expect(store.state.apiUsers.status).toEqual('loading')
//   })
// })

describe('apiVersion - actions', () => {
  test('getAll', async () => {
    // Add axios to the store object
    // Vuex.Store.prototype.$axios = axiosMock;

    const commit = jest.fn((a) => {
      console.log("Committing...", a)
    })
    // const username = "alice"
    // const password = "password"

    const version = {
      "apiTitle": "API title - my nice and great API -)",
      "apiDescription": "API description - see upper",
      "apiVersion": "0.0.1",
      "apiLegalNoticeUri": "https://legal.eprotocole.com/legal.pdf",
      "onlineHelpUri": "https://help.eprotocole.com",
      "defaultLanguage": "fr-FR"
    };

    // Mock any GET request to /users
    // arguments for reply are (status, data, headers)
    // axiosMock.onGet("/api/version").reply(200, version);

    await store.dispatch('apiVersion/getApiVersion');
    // await store.actions['apiUsers/getAll']({ commit }, { username, password })

    // expect(url).toBe("/api/authenticate")
    // expect(body).toEqual({ username, password })
    // expect(commit).toHaveBeenCalledWith(
    //   "SET_AUTHENTICATED", true)
  })
})

// describe('apiVersion - getters', () => {
//   test('isLoading', () => {
//     const {isLoading} = store.getters;
//     // expect(wrapper.element).toMatchSnapshot()
//     // apply mutation
//     const result = isLoading(state);
//     // assert result
//     expect(result).to.equal('loading');
//   })
// })
