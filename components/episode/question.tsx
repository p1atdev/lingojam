import { Box, Button, CloseButton, HStack, Text } from "@chakra-ui/react"
import { useState } from "react"
import { EpisodeMedia } from "../../types/episode"
import { motion } from "framer-motion"

type Props = {
    episode: EpisodeMedia
}

const EpisodeQuestion = ({ episode }: Props) => {
    const [showJa, setShowJa] = useState(false)

    return (
        <Box my={"8"}>
            <Text as={"p"} fontSize={"2xl"} fontWeight={"bold"}>
                Question -問題-
            </Text>

            <Text as={"p"} fontSize={"lg"}>
                {episode.question.en}
            </Text>
            <Box my={"2"}>
                {showJa ? (
                    <HStack>
                        <Text as={"p"} fontSize={"lg"}>
                            訳: {episode.question.ja}
                        </Text>

                        <CloseButton
                            onClick={() => {
                                setShowJa(false)
                            }}
                        />
                    </HStack>
                ) : (
                    <Button
                        variant="outline"
                        onClick={() => {
                            setShowJa(true)
                        }}
                    >
                        日本語訳を表示
                    </Button>
                )}
            </Box>
        </Box>
    )
}

export default EpisodeQuestion
