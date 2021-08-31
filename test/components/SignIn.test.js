import {mount, createLocalVue} from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
// ---
import mockAxios from '../mocks/mock.user';
import Dialog from '@/components/SignIn'

// Axios mock
jest.setMock('axios', mockAxios)

const localVue = createLocalVue()
localVue.use(Vuex)

describe('SignIn', () => {
  // let actions;
  // let store;
  let wrapper;

  const authMock = {
    loggedIn: true
  };

  beforeEach(() => {
    const vuetify = new Vuetify()

    wrapper = mount(Dialog, {
      mocks: {
        $auth: authMock
      },
      store: new Vuex.Store({
        state: {
          authentication: {user: null, loggedIn: false, strategy: "local"}
        }
      }),
      localVue,
      vuetify
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  test('is a Vue instance', () => {
    const wrapper = mount(Dialog)
    expect(wrapper.vm).toBeTruthy()
  })

  test('is fully functional', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
