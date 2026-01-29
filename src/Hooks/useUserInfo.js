import { useQuery } from "@tanstack/react-query";
import { getUserInfoApi } from "../ApiRequests/ApiRequests";

export const useUserInfo = () => {
    return useQuery({
        queryKey: ['user-info'],
        queryFn: getUserInfoApi,
        select: (data) => data.data.user
    })
}