import { Box, Button, HStack, Text, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react"
import { useState } from "react"
import { EpisodeMedia } from "../../types/episode"

type Props = {
    episode: EpisodeMedia
}

const EpisodeWords = ({ episode }: Props) => {
    const [showJa, setShowJa] = useState(false)

    return (
        <Box my={"8"}>
            <HStack>
                <Text as={"p"} fontSize={"2xl"} fontWeight={"bold"}>
                    Key Phrase -キーフレーズ-
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
            <TableContainer>
                <Table variant="simple">
                    {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                    <Thead>
                        <Tr>
                            <Th>Word</Th>
                            {showJa ? <Th>訳</Th> : null}
                            <Th>Meaning</Th>
                            {showJa ? <Th>意味</Th> : null}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {episode.words.map((word) => {
                            return (
                                <Tr key={word.word.en}>
                                    <Td>{word.word.en}</Td>
                                    {showJa ? <Td>{word.word.ja}</Td> : null}
                                    <Td>{word.meaning.en}</Td>
                                    {showJa ? <Td>{word.meaning.ja}</Td> : null}
                                </Tr>
                            )
                        })}
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>Word</Th>
                            {showJa ? <Th>訳</Th> : null}
                            <Th>Meaning</Th>
                            {showJa ? <Th>意味</Th> : null}
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default EpisodeWords
