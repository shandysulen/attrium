import { Box, Button, Flex, HStack, Image, ListItem, Slide, SlideProps, Text, UnorderedList } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';

import { navBarHeight, pagePaddingX } from '../constants';
import { useSellModal } from '../hooks/useSellModal';

const navItems: NavItemProps[] = [{
  name: 'Sell',
  route: '/sell'
}, {
  name: 'Marketplace',
  route: '/marketplace'
}];

interface NavItemProps {
  readonly name: string;
  readonly route: string;
}

const NavItem: React.FC<NavItemProps> = ({ route, name }) => (
  <ListItem>
    <Link href={route}>
      <a>
        <Text as='span' _hover={{ color: '#A87CFF' }}>
          {name}
        </Text>
      </a>
    </Link>
  </ListItem>
);

export const Navbar: React.FC<SlideProps> = (props) => {
  const { onOpen } = useSellModal();

  return (
    <Slide
      in={true}
      direction='top'
      style={{ zIndex: 10 }}
      {...props}
    >
      <Flex
        as='header'
        bg='white'
        h={navBarHeight}
        px={pagePaddingX}
        py='20px'
        justifyContent='space-between'
        alignItems='center'
        shadow='lg'
      >
        <Link href='/'>
          <a>
            <Image src='/logo.png' alt='Attrium Logo' w='100px' />
          </a>
        </Link>
        <HStack spacing='40px'>
          <UnorderedList display='flex' alignItems='center' gap='40px' listStyleType='none'>
            <ListItem>
              <Link href='/marketplace'>
                <a>
                  <Text as='span' _hover={{ color: '#A87CFF' }} fontWeight='bold'>
                    Marketplace
                  </Text>
                </a>
              </Link>
            </ListItem>
            <ListItem>
              <Button mt='2px' onClick={onOpen} shadow='none' bg='none' _hover={{ bg: 'none', color: '#A87CFF' }} py='0'>
                Sell
              </Button>
            </ListItem>
          </UnorderedList>
          <Box>
            <ConnectButton showBalance={false} />
          </Box>
        </HStack>
      </Flex>
    </Slide>
  );
};
