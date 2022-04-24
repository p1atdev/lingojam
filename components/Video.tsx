import ReactPlayer from "react-player"

type Props = {
    // videoUrl: string
    // thumbnailUrl: string
    url: string
}

const Player = ({ url }: Props) => {
    return (
        <div>
            <ReactPlayer url={url} />
        </div>
    )
}

export default Player
