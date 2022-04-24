import { Media } from "../types/media"
import { MediaSet } from "../types/mediaset"

export const getMedia = async (pid: string, vid: string): Promise<string> => {
    const mediaUrl = `https://open.live.bbc.co.uk/mediaselector/6/select/version/2.0/mediaset/pc/vpid/${vid}/format/json`
    const mediaSet: MediaSet = await fetch(mediaUrl).then((res) => res.json())

    const video = mediaSet.media
        .find((m) => m.kind === "video")
        ?.connection.filter((c) => c.protocol === "https")
        .filter((c) => c.transferFormat === "dash")[0]

    if (!video) {
        throw new Error("No video found")
    }

    return video.href
}
