import kbtState from './vuex_storage/state';
import kbtGetters from './vuex_storage/getters';
import kbtActions from './vuex_storage/actions';
import kbtMutations from  './vuex_storage/mutations'

export default {
    namespaced: true,
    state: kbtState,
    getters: kbtGetters,
    actions: kbtActions,
    mutations: kbtMutations,
}
