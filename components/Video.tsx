import { Box, Button, Text } from "@chakra-ui/react"
import { useContext, useEffect, useRef, useState } from "react"
import ReactPlayer from "react-player"
import { PlayerContext } from "./context/player"

type Props = {
    // videoUrl: string
    // thumbnailUrl: string
    url: string
}

const Player = ({ url }: Props) => {
    const { playing, togglePlaying, setPlayed, seekTo, setDuration, timestamp, setTimestamp } =
        useContext(PlayerContext)
    const ref = useRef<ReactPlayer>(null)

    useEffect(() => {
        if (ref.current) {
            ref.current.seekTo(seekTo)
        }
    }, [seekTo])

    return (
        <div>
            <ReactPlayer
                ref={ref}
                url={url}
                playing={playing}
                onDuration={(value) => {
                    setDuration(value)
                }}
                onProgress={(e) => {
                    setPlayed(e.played)
                    setTimestamp(e.playedSeconds)
                }}
            />
        </div>
    )
}

export default Player
