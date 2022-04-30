import { createContext, ReactNode, useCallback, useRef, useState } from "react"

type InitialContext = {
    playing: boolean
    togglePlaying: () => void

    /**
     * 経過時間
     */
    timestamp: number
    setTimestamp: (timestamp: number) => void

    /**
     * 経過時間割合 (0.0 ~ 1.0)
     */
    played: number
    setPlayed: (played: number) => void

    /**
     * 動画の長さ
     */
    duration: number
    setDuration: (duration: number) => void

    /**
     * シーク先 (0.0 ~ 1.0)
     */
    seekTo: number
    setSeekTo: (seekTo: number) => void
}

const initialContext = {} as InitialContext

const PlayerContext = createContext(initialContext)

type Props = {
    readonly children: ReactNode | ReactNode[]
}

const PlayerProvider = ({ children }: Props) => {
    const [playing, setPlaying] = useState(false)
    const [timestamp, setTimestamp] = useState(0)
    const [played, setPlayed] = useState(0)
    const [duration, setDuration] = useState(0)
    const [seekTo, setSeekTo] = useState(0)

    const togglePlaying = useCallback(() => setPlaying(!playing), [playing])

    return (
        <PlayerContext.Provider
            value={{
                playing,
                togglePlaying,
                played,
                setPlayed,
                timestamp,
                setTimestamp,
                duration,
                setDuration,
                seekTo,
                setSeekTo,
            }}
        >
            {children}
        </PlayerContext.Provider>
    )
}

export { PlayerContext, PlayerProvider }
