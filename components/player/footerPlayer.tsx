import {
    Box,
    Button,
    Center,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    Flex,
    HStack,
    Container,
} from "@chakra-ui/react"
import { useContext } from "react"
import { PlayerContext } from "../context/player"
import { Icon } from "@iconify/react"

const FooterPlayer = () => {
    const { playing, togglePlaying } = useContext(PlayerContext)

    return (
        <Container maxW={"container.lg"} w={"full"}>
            <HStack w={"full"}>
                <Center p={"4"}>
                    <Button
                        onClick={() => {
                            togglePlaying()
                        }}
                    >
                        <Center>{playing ? <Icon icon={"bi:pause-fill"} /> : <Icon icon={"bi:play-fill"} />}</Center>
                    </Button>
                </Center>

                <Center p={"4"} w={"full"}>
                    <Slider aria-label="slider-ex-1" defaultValue={30}>
                        <SliderTrack>
                            <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                    </Slider>
                </Center>
            </HStack>
        </Container>
    )
}

export default FooterPlayer
