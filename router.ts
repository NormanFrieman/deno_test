import {Router} from "https://deno.land/x/oak/mod.ts"

import getUsers from "./controllers/ListUsersController.ts"
import getUserDetails from "./controllers/ListUserDetailsController.ts"
import createUser from "./controllers/CreateUserController.ts"
import editUser from "./controllers/EditUserController.ts"
import deleteUser from "./controllers/DeleteUserController.ts"

const router = new Router()

router
    .get("/users", getUsers)
    .get("/users/:id", getUserDetails)
    .post("/users", createUser)
    .put("/users/:id", editUser)
    .delete("/users/:id", deleteUser)

export default router
