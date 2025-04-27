import urlConstants from "../shared/urlConstants"
import httpHelper from "../utils/interceptor"

const createAdvertisement = async (body) => {
    const response = await httpHelper.post(urlConstants.AUTH_ROUTES.CREATE_ADVERTISEMENT,body);
    return response;
}

const getAdvertisementList = async () => {
    const response = await httpHelper.get(urlConstants.AUTH_ROUTES.GET_ADVERTISEMENT_LIST);
    return response;
}

const getAdvertisementDetails = async (id) => {
    const response = await httpHelper.get(`${urlConstants.AUTH_ROUTES.GET_ADVERTISEMENT_LIST}/${id}`);
    return response;
}

const deleteAdvertisement = async (id) => {
    const response = await httpHelper.delete(`${urlConstants.AUTH_ROUTES.GET_ADVERTISEMENT_LIST}/${id}`);
    return response;
}

export {
    createAdvertisement,
    getAdvertisementList,
    getAdvertisementDetails,
    deleteAdvertisement
}