import { getFirestore } from "firebase-admin/firestore"
import { Episode, EpisodeMedia } from "../../types/episode"
import { getMedia } from "../media"
import "./init"

const db = getFirestore()

const episodesRef = db.collection("Episodes")

export const getEpisodes = async (): Promise<EpisodeMedia[]> => {
    const episodes = await episodesRef
        .get()
        .then((collection) => collection.docs)
        .then((docs) => docs.map((doc) => doc.data() as Episode))

    const episodeMedias = await Promise.all(
        episodes.map(async (episode) => {
            const media = await getMedia(episode.pid, episode.vid)
            return { ...episode, videoUrl: media }
        })
    )

    return episodeMedias
}

export const getEpisode = async (pid: string): Promise<EpisodeMedia> => {
    const episode = await episodesRef
        .where("pid", "==", pid)
        .get()
        .then((collection) => collection.docs[0].data() as Episode)

    const media = await getMedia(episode.pid, episode.vid)
    return { ...episode, videoUrl: media }
}
