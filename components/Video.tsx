import { Box, Button, Text } from "@chakra-ui/react"
import { useState } from "react"
import ReactPlayer from "react-player"

type Props = {
    // videoUrl: string
    // thumbnailUrl: string
    url: string
}

const Player = ({ url }: Props) => {
    const [playing, setPlaying] = useState(false)

    return (
        <div>
            <ReactPlayer url={url} playing={playing} />

            <Button
                onClick={() => {
                    setPlaying(!playing)
                }}
            >
                {playing ? "Pause" : "Play"}
            </Button>
        </div>
    )
}

export default Player
