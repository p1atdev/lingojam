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
            <Text as={"p"} fontSize={"xl"}>
                {episode.question.en}
            </Text>
            {showJa ? (
                <motion.div animate={{ opacity: [20, 100] }} transition={{ ease: "easeInOut", duration: 0.2 }}>
                    <HStack>
                        <Text as={"p"} fontSize={"xl"}>
                            訳: {episode.question.ja}
                        </Text>

                        <CloseButton
                            onClick={() => {
                                setShowJa(false)
                            }}
                        />
                    </HStack>
                </motion.div>
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
    )
}

export default EpisodeQuestion
