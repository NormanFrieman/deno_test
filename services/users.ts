import {fetchData, persistData} from "./db.ts"
import {User} from "../models/user.ts"
import createId from "../services/createId.ts"

type UserData = Pick<User, "name" | "age">

export const getUsers = async (): Promise<User[]> => {
    const users = await fetchData()

    return users.sort((a,b) => a.name.localeCompare(b.name))
}

export const getUser = async (userId: string): Promise<User | undefined> => {
    const users = await fetchData()

    return users.find(({id}) => id === userId)
}

export const createUser = async (userData: UserData): Promise<string> => {
    const users = await fetchData()

    const newUser: User = {
        id: createId(),
        name: String(userData.name),
        age: Number(userData.age),
        added: new Date()
    }

    await persistData([...users, newUser])

    return newUser.id
}

export const updateUser = async (
    userId: string,
    userData: UserData
): Promise<void> => {
    const user = await getUser(userId)

    if(!user){
        throw new Error("User not found")
    }

    const updateUser = {
        ...user,
        name: userData.name !== undefined ? String(userData.name) : user.name,
        age: userData.age !== undefined ? Number(userData.age) : user.age
    }

    const users = await fetchData()
    const filteredUsers = users.filter(user => user.id !== userId)

    persistData([...filteredUsers, updateUser])
}

export const deleteUser = async (userId: string): Promise<void> => {
    const users = await getUsers()
    const filteredUsers = users.filter(user => user.id !== userId)

    persistData(filteredUsers)
}