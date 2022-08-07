import { Box, Image, SlideFade, SlideFadeProps, Text, TextProps, VStack } from '@chakra-ui/react';
import { useInView } from 'framer-motion';
import React, { useRef } from 'react';
import { pagePaddingX } from '../constants';

type HighlightColor = 'peach' | 'pink' | 'purple';

const highlights: Record<HighlightColor, string> = {
    peach: '#FCD5CD',
    pink: '#FFB2B2',
    purple: '#A87CFF'
};

interface HighlightProps extends TextProps {
    readonly color: HighlightColor;
}

const Highlight: React.FC<HighlightProps> = ({ color, children }) => (
    <Text as='span' color={highlights[color]} fontSize='4xl'>{children}</Text>
);

const Underline: React.FC<TextProps> = ({ children }) => (
    <Text as='span' textDecor='underline' textDecorationColor='#FCD5CD' fontSize='4xl'>{children}</Text>
);

const IntersectionSlideFade: React.FC<SlideFadeProps> = ({ children }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 'all' });

    return (
        <SlideFade ref={ref} in={isInView} offsetY='40px' transition={{ enter: { duration: 1 } }}>
            {children}
        </SlideFade>
    );
};

export const About = () => {
    return (
        <VStack py='40px'>
            <IntersectionSlideFade>
                <Text fontSize='4xl'>a <Highlight color='peach'>token</Highlight> is a <Highlight color='pink'>representation</Highlight> of <Highlight color='purple'>something</Highlight></Text>
            </IntersectionSlideFade>
            <IntersectionSlideFade>
                <Text fontSize='4xl'>the <Highlight color='purple'>representation</Highlight> can be of a real-world asset, artwork, or <Highlight color='pink'>identity</Highlight></Text>
            </IntersectionSlideFade>
            <IntersectionSlideFade>
                <Text fontSize='4xl'><Highlight color='peach'>identity collections</Highlight> are often <Highlight color='pink'>static</Highlight></Text>
            </IntersectionSlideFade>
            <IntersectionSlideFade>
                <Text fontSize='4xl'>any <Highlight color='purple'>metadata changes</Highlight> are typically <Highlight color='pink'>random</Highlight> or out of the holders' <Highlight color='peach'>control</Highlight></Text>
            </IntersectionSlideFade>
            <IntersectionSlideFade>
                <Text fontSize='4xl'><Highlight color='peach'>identities</Highlight> currently <Highlight color='pink'>conform</Highlight> to <Highlight color='purple'>tokens</Highlight> <Underline>instead of the other way around</Underline></Text>
            </IntersectionSlideFade>
            <Box py='20px' px={pagePaddingX} w='100%'>
                <hr style={{ borderColor: '#E2E8F0', width: '100%' }} />
            </Box>
            <Text fontSize='4xl'><Image src='/logo.png' alt='Attrium Logo' display='inline' w='100px' verticalAlign='middle' /> is an economy where compatible tokens conform to identities</Text>
            <Text fontSize='4xl'>sell metadata traits you don't want</Text>
            <Text fontSize='4xl'>buy metadata traits you do</Text>
            <Text fontSize='4xl'>compose your identity</Text>
        </VStack>
    );
};
