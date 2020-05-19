import { Response, RouteParams } from "https://deno.land/x/oak/mod.ts";
import {deleteUser, getUser} from "../services/users.ts"

export default async ({
    params,
    response
}: {
    params: RouteParams;
    response: Response;
}) => {
    const userID = params.id

    if(!userID){
        response.status = 400
        response.body = {msg: "Invalid user id"}
        return
    }

    const foundUser = await getUser(userID)

    if(!foundUser){
        response.status = 404
        response.body = {msg: `User with ID ${userID} not found`}
        return
    }

    await deleteUser(userID)

    response.body = {msg: "User deleted"}
}