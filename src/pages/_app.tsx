import { ChakraProvider, useDisclosure } from '@chakra-ui/react';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { AppProps } from 'next/app';
import { WagmiConfig } from 'wagmi';

import { rainbowKitProviderConfig, wagmiClient } from '../config';
import { SellModalContext } from '../hooks/useSellModal';
import { Footer } from '../sections/Footer';
import { Navbar } from '../sections/Navbar';
import theme from '../theme';

import '@rainbow-me/rainbowkit/styles.css';
import { Networks, NFTFetchConfiguration } from '@zoralabs/nft-hooks';
import '../global.css';
import { SellModal } from '../sections/SellModal';
import { SwitchNetworkBannerWrapper } from '../sections/SwitchNetworkBanner';

function Attrium({ Component, pageProps }: AppProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider {...rainbowKitProviderConfig}>
        <SellModalContext.Provider value={{ isOpen, onClose, onOpen }}>
          <NFTFetchConfiguration networkId={Networks.MUMBAI}>
            <ChakraProvider theme={theme}>
              <Navbar />
              <SwitchNetworkBannerWrapper />
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
