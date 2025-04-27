import urlConstants from "../shared/urlConstants"
import httpHelper from "../utils/interceptor"

const updateUserProfile = async (body) => {
    const response = await httpHelper.put(urlConstants.AUTH_ROUTES.UPDATE_USER_PROFILE,body);
    return response;
}

export {
    updateUserProfile
}