import { Request, Response } from "https://deno.land/x/oak/mod.ts";
import {createUser} from "../services/users.ts"

export default async ({
    request,
    response
}: {
    request: Request;
    response: Response;
}) => {
    if(!request.hasBody){
        response.status = 400
        response.body = {msg: "Invalid user data"}
        return
    }
    const {
        value: {name, age}
    } = await request.body()

    const userID = await createUser({name, age})
    
    response.body = {msg: "User created", userID}
}