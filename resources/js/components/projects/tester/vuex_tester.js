import State from "./vuex_storage/state"
import Getters from "./vuex_storage/getters"
import Actions from "./vuex_storage/actions"
import Mutations from "./vuex_storage/mutations"

export default {
    namespaced: true,
    state: State,
    getters: Getters,
    actions: Actions,
    mutations: Mutations,
}
