# Attrium

Attrium is an on-chain trait economy built with [Zora V3](https://github.com/ourzora/v3) on [Polygon Mumbai](https://polygon.technology) enabling users to list and buy individual NFT traits to assign to their compatible ERC721 tokens. The Attrium marketplace is host to a single NFT collection: a simplified version of the [Nouns NFT collection](https://nouns.wtf) that implements the novel and (very) experimental [Attribute NFT paradigm](#Attribute-nft-paradigm) motivated by [lack of identity composition in NFT avatars](https://#motivation-&-ethos).

## Motivation & Ethos

<img src='./images/identity-crisis.jpg' alt='Identity Crisis' />

Attrium believes identity tokens should have the capacity for maximum composability, allowing for true expression of self on the blockchain.

## Attribute NFT Paradigm

Having briefly researched some standards and approches, like [Charged Particles](https://www.charged.fi/) and [RMRK](https://www.rmrk.app/), Attrium takes a seemingly different approach, in which the traits of a parent NFT are themselves also NFTs. We define these trait/attribute NFTs as Attribute NFTs and the parent which they compose the Attribute Parent NFT. The Attribute NFT only contains the required properties defined in the [ERC721 Metadata JSON Schema](https://eips.ethereum.org/EIPS/eip-721). An example of an Attribute NFT's metadata is the following taken from one of the Attribute NFTs used in the [Attrium Nouns](#Attribute-nft-paradigm) collection.

```json
{
    "name": "Body: Red",
    "description": "Red is the color of heat. It's full of passion.",
    "image": "ipfs://bafybeies5kt3yb6hxj3cllxi6nec65njqqw2g5tuttex6k5uqtbpxiswya/body-red.png"
}
```

## Attrium Nouns

The proof-of-concept collection used to showcase the Attribute NFT paradigm for  Attrium is none other than the homegrown Attrium Nouns. Each metadata attribute is tokenized and minted through dedicated ERC721 contracts. For this hack, only the [body trait was tokenized](https://mumbai.polygonscan.com/address/0x3aC0Dc9351b8a5b77F4fb9Bd45EA4Af65BEDFF1E). For the sake of being nimble and testing new technologies, all metadata for the attribute NFTs are hosted on IPFS via [NFT.Storage](https://nft.storage).

<img src='./images/nft-storage.jpg' alt='NFT Storage' />


Inspired by Nouns' on-chain approach, the Attribute NFT paradigm builds upon the on-chain `seeds` storage variable and on-chain SVG renderer that dictate a Noun's attributes and image. The contracts for Attrium Nouns were forked from the [`Nouns contracts`](https://github.com/nounsDAO/nouns-monorepo/tree/master/packages/nouns-contracts) and substantially simplified, doing away with governance, nounder mints, minting restrictions, and more. An Attrium Noun will look inside its holder's wallet to check if it has a corresponding Attribute NFT. If it does, the Attrium Noun will reference this particular trait in SVG render.

### Contracts

**Deployed Contracts (Polygon Mumbai)**

| Contract           | Address (PolygonScan) | Original |
| -----------        | ----------- | ----------- | ----------- | ----------- |
| AttriumNounsToken  | [0x61aBa107a0494ea676726d119E26cd07c0f52382](https://mumbai.polygonscan.com/address/0x61aBa107a0494ea676726d119E26cd07c0f52382) | [NounsToken](https://github.com/nounsDAO/nouns-monorepo/blob/master/packages/nouns-contracts/contracts/NounsToken.sol) | ✅ | The core ERC721 token contract. Simplified by removing the following functionalities: governance, nounsDAO, Nounders mints, and burning. In the original contract, only the `minters` address could mint. Here, any `EOA` can mint.
| AttriumNounsBody   | [0x3aC0Dc9351b8a5b77F4fb9Bd45EA4Af65BEDFF1E](https://mumbai.polygonscan.com/address/0x3aC0Dc9351b8a5b77F4fb9Bd45EA4Af65BEDFF1E) | ---- | 
| NounsSeeder        | [0xc383bC926a2c3DF2d928e387c380980cc7bCD310](https://mumbai.polygonscan.com/address/0xc383bC926a2c3DF2d928e387c380980cc7bCD310) |  |
| Inflator        | [0xCbae4dEe00001AD5b5dE7ABDBDbBC0A95384A84e](https://mumbai.polygonscan.com/address/0xc383bC926a2c3DF2d928e387c380980cc7bCD310)        | ----------- |
| Renderer        | [0xea5b72df95DE2cB8f4579AD05A95D97fbe1f0204](https://mumbai.polygonscan.com/address/0xea5b72df95DE2cB8f4579AD05A95D97fbe1f0204)        | ----------- |
| NounsArt        | [0x114282483bc4687e67387d42ef4907062aeacaba](https://mumbai.polygonscan.com/address/0x114282483bc4687e67387d42ef4907062aeacaba)        | ----------- |
| NounsDescriptorV2        | [0xe9F14b1CC05E5FcBe747cA248112594d56C20D77](https://mumbai.polygonscan.com/address/0xe9F14b1CC05E5FcBe747cA248112594d56C20D77)        | ----------- |

