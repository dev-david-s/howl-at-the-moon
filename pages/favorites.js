import moment from "moment";
import { getSession } from "next-auth/client";
import AudioPlayer from "../components/AudioPlayer";
import { db } from "../firebase";

function favorites({ favoriteSongs }) {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-background_mood-dark to-background_mood-medium">
            <div>
                <h1 className="text-2xl text-white font-bold my-4">Your Favorites</h1>
                <div className="grid grid-cols-1 sm:grid-cols-1 m-auto place-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-14 border-t-2 border-white p-8">
                    {favoriteSongs.map((favorite) => (
                        <AudioPlayer className="mx-10"
                            key={favorite.artwork}
                            title={favorite.title}
                            artwork={favorite.artwork}
                            artist={favorite.artist}
                            src={favorite.src}
                            trackId={favorite.id}
                            favoriteList={favoriteSongs}
                            hideFavorites={true}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default favorites

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session) {
        return {
            props: {}
        }
    }

    const userFavorites = await db.collection('users').doc(session.user?.email).collection('favorites').get();

    const favoriteSongs = await Promise.all(
        userFavorites.docs.map(async (favorite) => ({
            artist: favorite.data().artist,
            artwork: favorite.data().artwork,
            title: favorite.data().title,
            src: favorite.data().src,
            timestamp: moment(favorite.data().timestamp.toDate()).unix(),
        }))
    )

    return {
        props: {
            favoriteSongs
        }
    }
}