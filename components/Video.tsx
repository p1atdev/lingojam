import { Box, Button, Text } from "@chakra-ui/react"
import { useContext, useState } from "react"
import ReactPlayer from "react-player"
import { PlayerContext } from "./context/player"

type Props = {
    // videoUrl: string
    // thumbnailUrl: string
    url: string
}

const Player = ({ url }: Props) => {
    const { playing, togglePlaying } = useContext(PlayerContext)

    return (
        <div>
            <ReactPlayer url={url} playing={playing} />

            <Button
                onClick={() => {
                    togglePlaying()
                }}
            >
                {playing ? "Pause" : "Play"}
            </Button>
        </div>
    )
}

export default Player
