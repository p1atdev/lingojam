import { createContext, ReactNode, useCallback, useRef, useState } from "react"

type InitialContext = {
    playing: boolean
    togglePlaying: () => void
}

const initialContext = {} as InitialContext

const PlayerContext = createContext(initialContext)

type Props = {
    readonly children: ReactNode | ReactNode[]
}

const PlayerProvider = ({ children }: Props) => {
    const [playing, setPlaying] = useState(false)
    const togglePlaying = useCallback(() => setPlaying(!playing), [playing])

    return <PlayerContext.Provider value={{ playing, togglePlaying }}>{children}</PlayerContext.Provider>
}

export { PlayerContext, PlayerProvider }
