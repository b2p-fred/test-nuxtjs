import { shallowMount, createLocalVue } from "@vue/test-utils";
import plannerObjectSelector from "../../components/core/bars/planner/plannerObjectSelector";
// import { __createMocks as createStoreMocks } from "../../store";
// import _ from "lodash";

import Vuex from "vuex";
import Vuetify from "vuetify";

const usersItems = [
  {
    id:0
  }
];
const factory = () => {
  return shallowMount(plannerObjectSelector, {
    propsData: {
      usersItems: usersItems
    }
  });
};

describe("plannerObjectSelector.vue", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  localVue.use(Vuetify);

  // to use Store
  let NuxtStore;
  let store;

  beforeAll(async () => {
    // note the store will mutate across tests
    const storePath = `${process.env.buildDir}/store/index.js`;
    NuxtStore = await import(storePath);
  });

  beforeEach(async () => {
    store = await NuxtStore.createStore();
  });

  it("renders", () => {
    const wrapper = factory();
    expect(wrapper.exists()).toBe(true);
  });

  it("buttonClickedStoresObjectInStore", () => {
    const wrapper = factory();
    var btnref = "unSelectedBtn-0";
    const btn = wrapper.find({ ref: btnref });
    btn.trigger("click");
    // look whats in our Store
    const plannerObject = store.getters["planner/activePlannerObject"];
    console.log(plannerObject);
    expect(plannerObject).toBe(usersItems[0]);
  });

  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test("renders properly", () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
