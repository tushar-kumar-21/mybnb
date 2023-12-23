import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getFavouriteListings from "../actions/getFavouritesListing";
import FavouritesClient from "./FavouritesClient";

const ListingPage = async () => {

    const listings = await getFavouriteListings();
    const currentUser = await getCurrentUser();

    if (listings.length === 0) {
        return (
            <EmptyState
                title="No Favourites found"
                subtitle="Looks like you have no favourite listings"
            />
        )
    }

    return (
        <FavouritesClient
            listings={listings}
            currentUser={currentUser}
        />
    )
}
export default ListingPage;