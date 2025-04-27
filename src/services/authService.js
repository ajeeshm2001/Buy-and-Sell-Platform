import urlConstants from "../shared/urlConstants"
import httpHelper from "../utils/interceptor"

const register = async (body) => {
    const response = await httpHelper.post(urlConstants.AUTH_ROUTES.REGISTER,body);
    return response;
}

const login = async (body) => {
    const response = await httpHelper.post(urlConstants.AUTH_ROUTES.LOGIN,body);
    return response;
}

export {
    register,
    login
}