import { Box, Button, CloseButton, HStack, Text } from "@chakra-ui/react"
import { useState } from "react"
import { EpisodeMedia } from "../../types/episode"
import { motion } from "framer-motion"

type Props = {
    episode: EpisodeMedia
}

const EpisodeCategory = ({ episode }: Props) => {
    const [showJa, setShowJa] = useState(false)

    return (
        <Box my={"8"}>
            <Text as={"p"} fontSize={"2xl"} fontWeight={"bold"}>
                Category -カテゴリ-
            </Text>

            <Text as={"p"} fontSize={"xl"}>
                {episode.category.en}
            </Text>
            <Box my={"2"}>
                {showJa ? (
                    <HStack>
                        <Text as={"p"} fontSize={"xl"}>
                            訳: {episode.category.ja}
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

export default EpisodeCategory
