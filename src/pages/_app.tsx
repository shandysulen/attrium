import { ChakraProvider, useDisclosure } from '@chakra-ui/react';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { AppProps } from 'next/app';
import { useNetwork, WagmiConfig } from 'wagmi';

import { Footer } from '../sections/Footer';
import { rainbowKitProviderConfig, wagmiClient } from '../config';
import { SellModalContext } from '../hooks/useSellModal';
import { Navbar } from '../sections/Navbar';
import theme from '../theme';

import '@rainbow-me/rainbowkit/styles.css';
import '../global.css';
import { SellModal } from '../sections/SellModal';
import { Networks, NFTFetchConfiguration } from '@zoralabs/nft-hooks';
import { SwitchNetworkBanner } from '../sections/SwitchNetworkBanner';
import { navBarHeight } from '../constants';

function Attrium({ Component, pageProps }: AppProps) {
  const { chain } = useNetwork();
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider {...rainbowKitProviderConfig}>
        <SellModalContext.Provider value={{ isOpen, onClose, onOpen }}>
          <NFTFetchConfiguration networkId={Networks.MUMBAI}>
            <ChakraProvider theme={theme}>
              <Navbar />
              {chain?.id !== 80001 && <SwitchNetworkBanner mt={navBarHeight} />}
              <Component {...pageProps} />
              <Footer />
              {isOpen && <SellModal onClose={onClose} />}
            </ChakraProvider>
          </NFTFetchConfiguration>
        </SellModalContext.Provider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default Attrium;
