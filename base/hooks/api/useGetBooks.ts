import { IBookApiResponse } from "@/base/interface/IBook";
import { useQuery } from "@tanstack/react-query";


export const useGetBooks = () => {
    const handleGetBooks = async () => {
        const response = await fetch("https://www.googleapis.com/books/v1/volumes?q=react&maxResults=20");
        const data: IBookApiResponse = await response.json();
        return data;
    }

    const { data, isLoading, error } = useQuery({
        queryKey: ["books"],
        queryFn: handleGetBooks,
    });

    return { data, isLoading, error }
};