import {useQuery} from "@tanstack/react-query";
import {users} from "../api/users.api.js"
export const useGetUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: users,
        select: (data) => data.data,
    })
}