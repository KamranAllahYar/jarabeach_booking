import { GetterTree, MutationTree } from 'vuex';

export const state = () => ({
	groupType: 'individual' as string,
	adult_no: 1 as number,
	child_no: 0 as number,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {

}

export const mutations: MutationTree<RootState> = {
	UPDATE_GROUP_TYPE: (state, groupType) => {
		state.groupType = groupType;
	},
	// TOGGLE_MODAL: (state, open: boolean | null) => {
	// 	if (open) {
	// 		state.modalOpen = open;
	// 		return;
	// 	}

	// 	state.modalOpen = !state.modalOpen;
	// }
}
