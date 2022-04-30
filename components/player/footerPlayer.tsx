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
    chakra,
    Tooltip,
} from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { PlayerContext } from "../context/player"
import { Icon } from "@iconify/react"
import { intervalToDuration } from "date-fns"

const FooterPlayer = () => {
    const { playing, togglePlaying, played, setPlayed, seekTo, setSeekTo, timestamp, duration } =
        useContext(PlayerContext)

    // 0 ~ 100
    const [sliderValue, setSliderValue] = useState(0)
    const [showTooltip, setShowTooltip] = useState(false)

    const ChakraIcon = chakra(Icon)

    const getTime = () => {
        const time = intervalToDuration({
            start: 0,
            end: sliderValue * duration * 10,
        })
        return `${time.minutes?.toString().padStart(2, "0")}:${time.seconds?.toString().padStart(2, "0")}`
    }

    useEffect(() => {
        document.addEventListener("keydown", (e) => {
            if (e.key === " ") {
                e.preventDefault()
                togglePlaying()
            }
        })
    })

    useEffect(() => {
        setSliderValue(played * 100)
    }, [played])

    return (
        <Container maxW={"container.lg"} pb={"2"} px={["2", "4", "8"]} w={"full"}>
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
                    <Slider
                        aria-label="slider-ex-1"
                        value={sliderValue}
                        onChange={(value) => {
                            setSeekTo(value / 100)
                            setPlayed(value / 100)
                        }}
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                    >
                        <SliderTrack>
                            <SliderFilledTrack />
                        </SliderTrack>
                        <Tooltip
                            hasArrow
                            bg="teal.500"
                            color="white"
                            placement="top"
                            isOpen={showTooltip}
                            label={`${getTime()}`}
                        >
                            <SliderThumb boxSize={8}>
                                <Box color="blue" w={"full"} h={"full"} p={"1"}>
                                    <ChakraIcon icon="fluent:sound-wave-circle-20-regular" w={"full"} h={"full"} />
                                </Box>
                            </SliderThumb>
                        </Tooltip>
                    </Slider>
                </Center>
            </HStack>
        </Container>
    )
}

export default FooterPlayer
