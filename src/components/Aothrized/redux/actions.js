import { reqGetMenu, reqGetUserInfo } from "@api/acl/login";
import { GET_USER_INFO, GET_MENU } from "./constants";
const getUserinfosync = (user) => ({
    type: GET_USER_INFO,
    data: user
})

export const getUserinfo = () => {
    return (dispath) => {
        return reqGetUserInfo().then((response) => {
            dispath(getUserinfosync(response))
            return response
        })
    }
}

const getMenusync = (permissionList) => ({
    type: GET_MENU,
    data: permissionList
})

export const getMenu = () => {
    return (dispath) => {
        return reqGetMenu().then((response) => {
            dispath(getMenusync(response.permissionList))
            return response.permissionList
        })
    }
}