import { HStack, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';

export interface NFTCardProps {
    readonly tokenID: string;
    readonly name: string;
    readonly description: string;
    readonly image: string;
    readonly price?: string;
    readonly onClick?: any;
    readonly interactive: boolean;
    readonly cursor: 'list-cursor.png' | 'buy-cursor.png';
    readonly selected: boolean;
}

export const NFTCard: React.FC<NFTCardProps> = ({ name, image, description, price, onClick, cursor, selected, interactive = true }) => {
    return (
        <VStack
            className='buy-cursor'
            border='1px solid'
            borderColor='gray.200'
            rounded='4px'
            transition='0.2s all'
            _hover={interactive ? {
                shadow: 'glow-sm',
                opacity: 0.9,
                cursor: `url(${cursor}) 48 48, auto`
            } : {}}
            onClick={interactive && onClick}
            shadow={selected ? 'glow-sm' : undefined}
        >
            <Image src={image} alt='name' boxSize='200px' />
            <VStack px='20px' py='10px' alignItems='flex-start' borderTop='1px solid' borderColor='gray.200'>
                <HStack justifyContent='space-between' w='100%'>
                    <Text as='span' fontWeight='bold'>{name}</Text>
                    {price && (
                        <HStack>
                            <Image src='./polygon-logo.png' alt='Polygon logo' boxSize='16px' />
                            <Text as='span' fontWeight='bold'>{price}</Text>
                        </HStack>
                    )}
                </HStack>
                <Text as='span' fontSize='12px'>{description}</Text>
            </VStack>
        </VStack>
    );
};
