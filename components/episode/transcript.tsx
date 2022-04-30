import { Box, Button, HStack, Text } from "@chakra-ui/react"
import { useState } from "react"
import { EpisodeMedia } from "../../types/episode"

type Props = {
    episode: EpisodeMedia
}

const EpisodeTranscript = ({ episode }: Props) => {
    const [showJa, setShowJa] = useState(false)

    return (
        <Box my={"8"}>
            <HStack>
                <Text as={"p"} fontSize={"2xl"} fontWeight={"bold"}>
                    Transcript -書き起こし-
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

            {episode.transcript.sentences.map((sentence) => {
                return (
                    <Box my={"4"} key={sentence.text.en}>
                        <Text
                            my={sentence.type === "heading" ? "3" : "2"}
                            as={"p"}
                            fontSize={sentence.type === "heading" ? "xl" : "md"}
                            fontWeight={sentence.type === "heading" ? "semibold" : "normal"}
                        >
                            {sentence.text.en}
                        </Text>
                        {showJa && (
                            <Text
                                my={sentence.type === "heading" ? "3" : "2"}
                                as={"p"}
                                fontSize={sentence.type === "heading" ? "xl" : "md"}
                                fontWeight={sentence.type === "heading" ? "semibold" : "normal"}
                            >
                                {sentence.text.ja}
                            </Text>
                        )}
                    </Box>
                )
            })}
        </Box>
    )
}

export default EpisodeTranscript
