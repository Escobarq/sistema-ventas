import {redirect} from "@sveltejs/kit";
import {pb} from "@utils/pocketBase";


export const load = async () => {

    if (!pb.authStore.isValid) {
        throw redirect(302, '/auth/login');
    }
};
