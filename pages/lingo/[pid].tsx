import {
    Box,
    Center,
    Container,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Text,
    Tfoot,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import Player from "../../components/Video"
import { EpisodeMedia } from "../../types/episode"
import { getEpisode } from "../../utils/firebase/firestore"

type Props = {
    episode: EpisodeMedia
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const pid = ctx.params?.pid as string | undefined

    if (!pid) {
        return {
            redirect: {
                destination: "/",
            },
            props: {},
        }
    }

    try {
        const episode = await getEpisode(pid)

        return {
            props: {
                episode: JSON.parse(JSON.stringify(episode)),
            },
        }
    } catch {
        return {
            redirect: {
                destination: "/",
            },
            props: {},
        }
    }
}

const Page = ({ episode }: Props) => {
    return (
        <Center>
            <Container py={"20"} maxW={"container.md"}>
                <Box my={"8"}>
                    <Text as={"h1"} fontSize={"3xl"} fontWeight={"black"}>
                        {episode.title.en}
                    </Text>
                    <Text as={"p"} fontSize={"xl"} fontWeight={"bold"}>
                        {episode.title.ja}
                    </Text>
                </Box>

                <Center p={"auto"}>
                    <Player url={episode.videoUrl} />
                </Center>

                {/* <Box my={"8"}>
                    <Text as={"h1"} fontSize={"3xl"} fontWeight={"black"}>
                        {episode.title.en}
                    </Text>
                    <Text as={"p"} fontSize={"xl"} fontWeight={"bold"}>
                        {episode.title.ja}
                    </Text>
                </Box> */}

                <Box my={"8"}>
                    <Text as={"p"} fontSize={"2xl"} fontWeight={"bold"}>
                        Category -カテゴリ-
                    </Text>
                    <Text as={"p"} fontSize={"xl"}>
                        {episode.category.en}
                    </Text>
                    {/* <Text as={"p"} fontSize={"xl"}>
                        {episode.category.ja}
                    </Text> */}
                </Box>

                <Box my={"8"}>
                    <Text as={"p"} fontSize={"2xl"} fontWeight={"bold"}>
                        Key Phrase -キーフレーズ-
                    </Text>
                    <TableContainer>
                        <Table variant="simple">
                            <TableCaption>Imperial to metric conversion factors</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>Word</Th>
                                    <Th>Meaning</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {episode.words.map((word) => {
                                    return (
                                        <Tr key={word.word.en}>
                                            <Td>{word.word.en}</Td>
                                            <Td>{word.meaning.en}</Td>
                                        </Tr>
                                    )
                                })}
                            </Tbody>
                            <Tfoot>
                                <Tr>
                                    <Th>Word</Th>
                                    <Th>Meaning</Th>
                                </Tr>
                            </Tfoot>
                        </Table>
                    </TableContainer>
                </Box>

                <Box my={"8"}>
                    <Text as={"p"} fontSize={"2xl"} fontWeight={"bold"}>
                        Question -問題-
                    </Text>
                    <Text as={"p"} fontSize={"xl"}>
                        {episode.question.en}
                    </Text>
                </Box>

                <Box my={"8"}>
                    <Text as={"p"} fontSize={"2xl"} fontWeight={"bold"}>
                        Transcript -書き起こし-
                    </Text>
                    {episode.transcript.sentences.map((sentence) => {
                        return (
                            <Text
                                my={sentence.type === "heading" ? "3" : "2"}
                                as={"p"}
                                fontSize={sentence.type === "heading" ? "xl" : "md"}
                                fontWeight={sentence.type === "heading" ? "semibold" : "normal"}
                                key={sentence.text.en}
                            >
                                {sentence.text.en}
                            </Text>
                        )
                    })}
                </Box>

                <Box>
                    <Text as={"p"} fontSize={"2xl"} fontWeight={"bold"}>
                        Answer -答え-
                    </Text>
                    {episode.answer.map((sentence) => {
                        return (
                            <Text my={"2"} key={sentence.en}>
                                {sentence.en}
                            </Text>
                        )
                    })}
                </Box>
            </Container>
        </Center>
    )
}

export default Page
