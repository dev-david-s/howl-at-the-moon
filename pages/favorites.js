import moment from "moment";
import { getSession } from "next-auth/client";
import AudioPlayer from "../components/AudioPlayer";
import { db } from "../firebase";

function favorites({ favorites }) {
    return (
        <div>
            {favorites.map((favorite) => (
                <AudioPlayer
                    key={favorite.artwork}
                    title={favorite.title}
                    artwork={favorite.artwork}
                    artist={favorite.artist}
                    src={favorite.url}
                    trackId={favorite.id}
                    favoriteList={favorites}
                />
            ))}
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

    const favorites = await Promise.all(
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
            favorites
        }
    }
}