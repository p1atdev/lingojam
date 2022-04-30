import { Box, Center, Container, Text } from "@chakra-ui/react"
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next"
import Link from "next/link"
import { useEffect, useState } from "react"
import { PlayerProvider } from "../../components/context/player"
import EpisodeAnswer from "../../components/episode/answer"
import EpisodeCategory from "../../components/episode/category"
import EpisodeQuestion from "../../components/episode/question"
import EpisodeTranscript from "../../components/episode/transcript"
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
                    <Box maxW={["sm", "md", "2xl"]}>
                        <Container pt={"10"} pb={"20"} maxW={["container.sm", "container.md"]}>
                            <Link href={"/"}>
                                <a>
                                    <Text fontSize={"2xl"} fontWeight={"bold"} borderBottom={{ hover: "1" }}>
                                        Lingojam
                                    </Text>
                                </a>
                            </Link>

                            <Box my={"8"}>
                                <Text as={"h1"} fontSize={"3xl"} fontWeight={"black"}>
                                    {episode.title.en}
                                </Text>
                                <Text as={"p"} fontSize={"xl"} fontWeight={"bold"}>
                                    {episode.title.ja}
                                </Text>
                            </Box>

                            <Center>
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

                            {/* 書き起こし */}
                            <EpisodeTranscript episode={episode} />

                            {/* 答え */}
                            <EpisodeAnswer episode={episode} />
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
