import { getDefaultWallets, lightTheme } from '@rainbow-me/rainbowkit';
import { RainbowKitProviderProps } from '@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/RainbowKitProvider';
import { configureChains, chain, createClient } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
    [chain.mainnet, chain.polygon, chain.polygonMumbai],
    [
        alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ETHEREUM_MAINNET_API_KEY }),
        alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_MAINNET_API_KEY }),
        alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_MUMBAI_API_KEY }),
        publicProvider()
    ]
);

const { connectors } = getDefaultWallets({
    appName: 'Attrium',
    chains
});

export const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
});

export const rainbowKitProviderConfig: RainbowKitProviderProps = {
    chains: [{ id: 1 }, { id: 137 }],
    theme: lightTheme({
        accentColor: '#A87CFF',
        accentColorForeground: 'white',
        borderRadius: 'small',
        fontStack: 'system',
        overlayBlur: 'small'
    })
};

