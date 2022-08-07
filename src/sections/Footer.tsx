import { Flex, HStack, Image, Link, Slide, SlideProps, Text } from '@chakra-ui/react';
import { footerHeight, pagePaddingX } from '../constants';

export const Footer: React.FC<SlideProps> = (props) => (
    <Slide
        in={true}
        direction='bottom'
        {...props}
    >
        <Flex
            as='footer'
            h={footerHeight}
            bg='white'
            px={pagePaddingX}
            py='20px'
            shadow='md-all'
        >
            <HStack w='33%'>
                <Text as='span'>Proudly built on</Text>
                <Link href='https://zora.co' target='_blank'>
                    <Image src='/zora.png' alt='Zora' w='60px' />
                </Link>
                <Link href='https://polygon.technology' target='_blank'>
                    <Image src='/polygon.png' alt='Polygon' w='60px' />
                </Link>
                <Link href='https://nft.storage' target='_blank'>
                    <Image src='/nft-storage.png' alt='NFT Storage' w='40px' />
                </Link>
            </HStack>
            <Flex justifyContent='center' w='33%'>
                <Link href='https://ethglobal.com/events/metabolism' target='_blank'>
                    <Image src='/github.svg' alt='GitHub' boxSize='24px' />
                </Link>
            </Flex>
            <Flex justifyContent='flex-end' w='33%'>
                <Text as='span'>Built for <Link href='https://ethglobal.com/events/metabolism' target='_blank'>Metabolism</Link></Text>
            </Flex>
        </Flex>
    </Slide>
);
