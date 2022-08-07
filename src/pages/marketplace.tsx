import { Spacer, VStack } from '@chakra-ui/react';
import { Listings } from '../sections/Listings';
import { Overview } from '../sections/Overview';
import { footerHeight, navBarHeight } from '../constants';

const Marketplace = () => (
    <VStack mt={navBarHeight}>
        <Overview />
        <Listings pt='40px' />
        <Spacer h={footerHeight} pt='80px' />
    </VStack>
);

export default Marketplace;
