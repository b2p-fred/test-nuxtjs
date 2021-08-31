// Include all the test setup (executed for each test...) source code!
import Vue from 'vue'
import VueX from 'vuex'
import Vuetify from 'vuetify'
import { config } from '@vue/test-utils'

Vue.use(Vuetify);
Vue.use(VueX);
Vue.config.productionTip = false;
Vue.config.silent = false;

// Vue.config.ignoredElements = ['nuxt-link']
// Mock Nuxt components
config.stubs.nuxt = { template: '<div />' }
config.stubs['nuxt-link'] = { template: '<a><slot /></a>' }
config.stubs['no-ssr'] = { template: '<span><slot /></span>' }


// import Vue from 'vue'
// import Vuetify from 'vuetify'
// import VueTestUtils from '@vue/test-utils'
//
// Vue.use(Vuetify)
//
// // Mock Nuxt components
// VueTestUtils.config.stubs['nuxt'] = '<div />'
// VueTestUtils.config.stubs['nuxt-link'] = '<a><slot /></a>'
// VueTestUtils.config.stubs['no-ssr'] = '<span><slot /></span>'
