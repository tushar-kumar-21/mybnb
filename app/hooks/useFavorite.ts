import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { SafeUser } from "../types";

import useLoginModal from "./useLoginModal";
import { DEFAULT_CIPHERS } from "tls";

interface IUserFavorite {
    listingId: string;
    currentUser?: SafeUser | null;
}

const useFavorite = ({
    listingId,
    currentUser
}: IUserFavorite) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favouriteIds || []
        return list.includes(listingId);
    }, [currentUser, listingId]);

    const toggleFavorite = useCallback(async (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        e.stopPropagation();
        if (!currentUser) {
            return loginModal.onOpen();
        }
        try {
            let request;
            if (hasFavorited) {
                request = () => axios.delete(`/api/favorites/${listingId}`);
            } else {
                request = () => axios.post(`/api/favorites/${listingId}`);
            }
            await request();
            router.refresh();
            toast.success('Success');
        } catch (err) {
            console.log(err)
            toast.error('Something went wrong')
        }
    }, [
        currentUser,
        hasFavorited,
        listingId,
        loginModal,
        router
    ])
    return {
        hasFavorited,
        toggleFavorite
    }
}
export default useFavorite;