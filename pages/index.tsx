import { Box, Center, Container, Grid, GridItem, Text } from "@chakra-ui/react"
import type { GetServerSidePropsContext, GetStaticProps } from "next"
import Image from "next/image"
import Link from "next/link"
import Player from "../components/Video"
import { EpisodeMedia } from "../types/episode"
import { getEpisodes } from "../utils/firebase/firestore"

type Props = {
    episodes: EpisodeMedia[]
}

// export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
export const getStaticProps: GetStaticProps = async (ctx) => {
    const episodes = await getEpisodes()

    return {
        props: {
            episodes: JSON.parse(JSON.stringify(episodes.reverse())),
        },
    }
}

const Page = ({ episodes }: Props) => {
    return (
        <Container as={"div"} py={"20"} maxW={"container.lg"}>
            <Center>
                <Grid as={"div"} templateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={[4]}>
                    {episodes.map((episode) => (
                        <GridItem as={"div"} key={episode.pid}>
                            <Link href={`/lingo/${episode.pid}`}>
                                <a>
                                    <Box maxW={"80"}>
                                        {/* <Player url={episode.videoUrl} /> */}
                                        <Image
                                            src={episode.thumbnailUrl}
                                            width={640}
                                            height={360}
                                            alt={episode.title.en}
                                        />
                                        {/* <p>{episode.thumbnailUrl}</p> */}

                                        <Text as={"h3"} fontSize={"large"} fontWeight={"semibold"}>
                                            {episode.title.en}
                                        </Text>
                                        <Text as={"p"} opacity={"75"}>
                                            {episode.title.ja}
                                        </Text>
                                    </Box>
                                </a>
                            </Link>
                        </GridItem>
                    ))}
                </Grid>
            </Center>
        </Container>
    )
}

export default Page
