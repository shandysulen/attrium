import { Spacer } from '@chakra-ui/react';
import { footerHeight } from '../constants';
import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { useSellModal } from '../hooks/useSellModal';

const Index = () => {
  return (
    <>
      <Hero />
      <About />
      <Spacer h={footerHeight} />
    </>
  );
};

export default Index;
