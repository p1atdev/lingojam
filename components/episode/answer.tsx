import { Box, Button, CloseButton, HStack, Text } from "@chakra-ui/react"
import { useState } from "react"
import { EpisodeMedia } from "../../types/episode"

type Props = {
    episode: EpisodeMedia
}

const EpisodeAnswer = ({ episode }: Props) => {
    const [showJa, setShowJa] = useState(false)

    return (
        <Box>
            <HStack>
                <Text as={"p"} fontSize={"2xl"} fontWeight={"bold"}>
                    Answer -答え-
                </Text>
                <Button
                    variant="outline"
                    onClick={() => {
                        setShowJa(!showJa)
                    }}
                >
                    {showJa ? "日本語訳を隠す" : "日本語訳を表示"}
                </Button>
            </HStack>

            <div>
                {episode.answer.map((sentence) => {
                    return (
                        <Box my={"2"} key={sentence.en}>
                            <Text>{sentence.en}</Text>
                            {showJa && <Text>{sentence.ja}</Text>}
                        </Box>
                    )
                })}
            </div>
        </Box>
    )
}

export default EpisodeAnswer
