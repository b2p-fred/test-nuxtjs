export const state = () => ({
  status: "",
  errors: [],
  configuration: null,
});

export const actions = {
  async getApiVersion({commit, rootState}, parameters) {
    commit("getRequest");

    // // Some GET version parameters
    // for (const [key, value] of Object.entries(parameters)) {
    //   console.log(`Parameters ${key} = ${value}`);
    // }

    await this.$axios.$get(rootState.remote.apiVersion, {params: parameters})
      .then(resp => {
        commit('getSuccess', resp);
      })
      .catch(err => {
        if (err.response) {
          // client received an error response (5xx, 4xx)
        } else if (err.request) {
          // client never received a response, or request never left
        } else {
          // anything else
        }
        commit('getFailure', [err]);
      });
  }
};

export const mutations = {
  getRequest(_state) {
    _state.status = "loading";
  },
  getSuccess(_state, data) {
    _state.status = "success";
    _state.configuration = data;
  },
  getFailure(_state, errors) {
    _state.status = "error";
    _state.errors = errors;
  }
};
