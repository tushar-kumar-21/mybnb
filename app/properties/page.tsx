import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import PropertiesClient from "./propertiesClient";
import getListings from "../actions/getListings";
import { SafeListing } from "../types";

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmptyState
                title='Unauthorized'
                subtitle="Please login"
            />
        )
    }

    const listings:SafeListing[] | undefined = await getListings({
        userId: currentUser.id
    }) 

    if (!listings || listings.length === 0) {
        return (
            <EmptyState
                title="No properties found"
                subtitle="Looks like you have no properties."
            />
        )
    }

    return (
        <PropertiesClient
            listings={listings}
            currentUser={currentUser}
        />
    )

}

export default PropertiesPage;