import { Translation } from "./translation"

export type Transcript = {
    sentences: Sentence[]
}

export type Sentence = {
    text: Translation
    type: "paragraph" | "heading"
}
