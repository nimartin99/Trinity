import axios from 'axios';

const actions = {
    // #Default Axios Setup
    initAxiosInstance: ({commit, getters}) => {
        try {

            const instance = axios.create({
                baseURL: getters.getServerAdress,
                withCredentials: true,
            });

            commit('SET_AXIOS_INSTANCE', instance);

        } catch (error) {
            // eslint-disable-next-line no-console
            console.log('initAxiosInstance', error);
        }
    },
};

export default actions;
