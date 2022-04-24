import { Box, Container, Grid, GridItem } from "@chakra-ui/react"
import type { GetServerSidePropsContext } from "next"
import Image from "next/image"
import Player from "../components/Video"
import { EpisodeMedia } from "../types/episode"
import { getEpisodes } from "../utils/firebase/firestore"

type Props = {
    episodes: EpisodeMedia[]
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const episodes = await getEpisodes()

    return {
        props: {
            episodes: JSON.parse(JSON.stringify(episodes)),
        },
    }
}

const Page = ({ episodes }: Props) => {
    return (
        <Container py={"20"} maxW={"container.lg"}>
            <Grid templateColumns="repeat(4, 1fr)" gap={2}>
                {episodes.reverse().map((episode) => (
                    <GridItem key={episode.pid}>
                        <Box maxW={"80"}>
                            {/* <Player url={episode.videoUrl} /> */}
                            <Image src={episode.thumbnailUrl} width={640} height={360} />
                            {/* <p>{episode.thumbnailUrl}</p> */}

                            <h2>{episode.title.en}</h2>
                            <p>{episode.title.ja}</p>
                        </Box>
                    </GridItem>
                ))}
            </Grid>
        </Container>
    )
}

export default Page
