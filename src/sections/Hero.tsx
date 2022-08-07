import { Box, Button, chakra, Heading, HStack, Image, SlideFade, Spacer, StackProps, Text, VStack } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { footerHeight, navBarHeight, pagePaddingX } from '../constants';
import { BsArrowDownLeft, BsArrowDownRight } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { isValidMotionProp, motion } from 'framer-motion';

const ChakraBox = chakra(motion.div, {
    /**
     * Allow motion props and the children prop to be forwarded.
     * All other chakra props not matching the motion props will still be forwarded.
     */
    shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === 'children',
});

export const LearnMoreDivider: React.FC<StackProps> = (props) => (
    <HStack w='100%' {...props}>
        <Box flexGrow={1} h='1px' border='1px solid' borderColor='white' />
        <HStack>
            <BsArrowDownLeft color='white' />
            <Text as='span' color='white' fontSize='12px' fontWeight='700'>LEARN MORE</Text>
            <BsArrowDownRight color='white' />
            <BsArrowDownLeft color='white' />
            <Text as='span' color='white' fontSize='12px' fontWeight='700'>LEARN MORE</Text>
            <BsArrowDownRight color='white' />
            <BsArrowDownLeft color='white' />
            <Text as='span' color='white' fontSize='12px' fontWeight='700'>LEARN MORE</Text>
            <BsArrowDownRight color='white' />
            <BsArrowDownLeft color='white' />
            <Text as='span' color='white' fontSize='12px' fontWeight='700'>LEARN MORE</Text>
            <BsArrowDownRight color='white' />
            <BsArrowDownLeft color='white' />
            <Text as='span' color='white' fontSize='12px' fontWeight='700'>LEARN MORE</Text>
            <BsArrowDownRight color='white' />
            <BsArrowDownLeft color='white' />
            <Text as='span' color='white' fontSize='12px' fontWeight='700'>LEARN MORE</Text>
            <BsArrowDownRight color='white' />
            <BsArrowDownLeft color='white' />
            <Text as='span' color='white' fontSize='12px' fontWeight='700'>LEARN MORE</Text>
            <BsArrowDownRight color='white' />
            <BsArrowDownLeft color='white' />
            <Text as='span' color='white' fontSize='12px' fontWeight='700'>LEARN MORE</Text>
            <BsArrowDownRight color='white' />
        </HStack>
        <Box flexGrow={1} h='1px' border='1px solid' borderColor='white' />
    </HStack>
);

export const Hero: React.FC<StackProps> = (props) => {
    const [showHeading, setShowHeading] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const { push } = useRouter();

    useEffect(() => {
        setTimeout(() => setShowHeading(true), 300);
        setTimeout(() => setShowButton(true), 600);
    }, []);

    const goToMarketplace = useCallback(() => push('/marketplace'), []);

    return (
        <VStack
            w='100%'
            minH={`calc(100vh - ${footerHeight})`}
            textAlign='center'
            justifyContent='center'
            backgroundImage='url("hero-bg.png")'
            backgroundSize='cover'
            position='relative'
            {...props}
        >
            <SlideFade in={showHeading} px={pagePaddingX} offsetY='40px' transition={{ enter: { duration: 0.5 } }}>
                <Heading as='h1' fontSize={{ base: '72px', md: '128px' }} pt={`calc(${navBarHeight} + 20px)`}>The On-Chain<br />Trait Economy</Heading>
            </SlideFade>
            <SlideFade in={showButton} offsetY='40px' transition={{ enter: { duration: 0.5 } }}>
                <Button py='30px' px='30px' onClick={goToMarketplace}>
                    <VStack spacing='2px'>
                        <Text as='span'>VISIT MARKETPLACE</Text>
                        <HStack spacing='4px'>
                            <Image src='/nouns.jpg' boxSize='14px' rounded='full' />
                            <Text as='span' fontSize='12px'>Nouns</Text>
                        </HStack>
                    </VStack>
                </Button>
            </SlideFade>
            <LearnMoreDivider pt='40px' />
            <Spacer bg='linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)' minH='100px' />
        </VStack>
    );
};
