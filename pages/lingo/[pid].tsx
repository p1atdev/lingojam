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
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next"
import { useEffect, useState } from "react"
import { PlayerProvider } from "../../components/context/player"
import EpisodeCategory from "../../components/episode/category"
import EpisodeQuestion from "../../components/episode/question"
import EpisodeWords from "../../components/episode/words"
import FooterPlayer from "../../components/player/footerPlayer"
import Player from "../../components/Video"
import { EpisodeMedia } from "../../types/episode"
import { getEpisode, getEpisodes } from "../../utils/firebase/firestore"

type Props = {
    episode: EpisodeMedia
}

// 最初に実行される。事前ビルドするパスを配列でreturnする。
export const getStaticPaths: GetStaticPaths = async () => {
    const episodes = await getEpisodes()

    return {
        paths: episodes.map((episode) => ({
            params: {
                pid: episode.pid,
            },
        })),
        fallback: false,
    }
}

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
export const getStaticProps: GetStaticProps = async (ctx) => {
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
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])
    if (!mounted) return null

    return (
        <PlayerProvider>
            <Box h={"screen"}>
                <Center>
                    <Box>
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

                            <Box my={"8"}>
                                <Text as={"h1"} fontSize={"3xl"} fontWeight={"black"}>
                                    {episode.title.en}
                                </Text>
                                <Text as={"p"} fontSize={"xl"} fontWeight={"bold"}>
                                    {episode.title.ja}
                                </Text>
                            </Box>

                            {/* カテゴリ */}
                            <EpisodeCategory episode={episode} />

                            {/* 単語 */}
                            <EpisodeWords episode={episode} />

                            {/* 問題 */}
                            <EpisodeQuestion episode={episode} />

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
                                <div>
                                    {episode.answer.map((sentence) => {
                                        return (
                                            <Text my={"2"} key={sentence.en}>
                                                {sentence.en}
                                            </Text>
                                        )
                                    })}
                                </div>
                            </Box>
                        </Container>
                    </Box>
                </Center>
                <Center position={"fixed"} insetX={"0"} bottom={"0"} bg={"white"}>
                    <FooterPlayer />
                </Center>
            </Box>
        </PlayerProvider>
    )
}

export default Page
