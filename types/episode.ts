import { Media } from "./media"
import { Transcript } from "./transcript"
import { Translation } from "./translation"
import { Word } from "./word"

export type Episode = {
    /**
     * Episode number
     */
    number: string

    /**
     * Date
     */
    date: string

    /**
     * The story…
     */
    title: Translation

    /**
     * thumbnail url
     */
    thumbnailUrl: string

    /**
     * pid
     */
    pid: string
    /**
     * video id
     */
    vid: string

    /**
     * Learn language related to…
     */
    category: Translation
    /**
     * Need-to-know language…
     */
    words: Word[]
    /**
     * Answer this…
     */
    question: Translation
    /**
     * Transcript
     */
    transcript: Transcript
    /**
     * Did you get it?
     */
    answer: Translation[]
}

export type EpisodeMedia = Episode & Media
