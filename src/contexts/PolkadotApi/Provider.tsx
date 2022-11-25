/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-mutable-exports */
import React, { createContext, memo, useCallback, useEffect, useState } from 'react'
import { ApiPromise, WsProvider } from '@polkadot/api'
import { GLITCH_EVM_TYPES } from 'constants/glitchNetwork'
import { web3Accounts, web3Enable } from 'packages/extension-dapp'
import type { InjectedExtension } from '@polkadot/extension-inject/types'
import type { ChainProperties, ChainType } from '@polkadot/types/interfaces'
import { deriveMapCache, setDeriveCache } from '@polkadot/api-derive/util'
import type { SubmittableExtrinsicFunction } from '@polkadot/api/promise/types'
import { formatBalance, isTestChain, objectSpread, stringify } from '@polkadot/util'
import { keyring } from '@polkadot/ui-keyring'
import { toast } from 'react-toastify'
import { defaults as addressDefaults } from '@polkadot/util-crypto/address/defaults'
import { KeyringStore } from '@polkadot/ui-keyring/types'
import registry from './typeRegistry'

export type PolkadotContextApiTypes = {
  api: ApiPromise
  accountSelected: string
  isApiConnected: boolean
  isApiInitialized: boolean
  isHasExtension: boolean
  setAccountSelected: (account: string) => void
}

interface InjectedAccountExt {
  address: string
  meta: {
    name: string
    source: string
    whenCreated: number
  }
}

interface ChainData {
  injectedAccounts: InjectedAccountExt[]
  properties: ChainProperties
  systemChain: string
  systemChainType: ChainType
  systemName: string
  systemVersion: string
}

export interface ApiState {
  apiDefaultTx: SubmittableExtrinsicFunction
  apiDefaultTxSudo: SubmittableExtrinsicFunction
  chainSS58: number
  hasInjectedAccounts: boolean
  isApiReady: boolean
  isDevelopment: boolean
  isEthereum: boolean
  specName: string
  specVersion: string
  systemChain: string
  systemName: string
  systemVersion: string
}

export interface Option {
  info?: string
  isDisabled?: boolean
  isHeader?: boolean
  text: React.ReactNode
  value: string | number
}

export interface LinkOption extends Option {
  dnslink?: string
  genesisHash?: string
  genesisHashRelay?: string
  homepage?: string
  isChild?: boolean
  isDevelopment?: boolean
  isLightClient?: boolean
  isRelay?: boolean
  isUnreachable?: boolean
  isSpaced?: boolean
  linked?: LinkOption[]
  paraId?: number
  summary?: string
  teleport?: number[]
  textBy: string
  value: string
  valueRelay?: string[]
}

const DISALLOW_EXTENSIONS: string[] = []
export const DEFAULT_DECIMALS = registry.createType('u32', 12)
export const DEFAULT_SS58 = registry.createType('u32', addressDefaults.prefix)
export const DEFAULT_AUX = ['Aux1', 'Aux2', 'Aux3', 'Aux4', 'Aux5', 'Aux6', 'Aux7', 'Aux8', 'Aux9']
export const ethereumChains = [
  'jaz',
  'moonbase',
  'moonbeam',
  'moonriver',
  'moonshadow',
  'alt-producer',
  'flash-layer',
  'armonia-eva',
  'armonia-wall-e',
]

let api: ApiPromise

function isKeyringLoaded() {
  try {
    return !!keyring.keyring
  } catch {
    return false
  }
}

export const PolkadotApiContext = createContext<PolkadotContextApiTypes>(undefined)

async function createApi(apiUrl: string, onError: (error: unknown) => void): Promise<void> {
  try {
    const provider = new WsProvider(apiUrl)

    api = new ApiPromise({
      provider,
      types: GLITCH_EVM_TYPES,
    })
  } catch (error) {
    onError(error)
  }
}

async function getInjectedAccounts(injectedPromise: Promise<InjectedExtension[]>): Promise<InjectedAccountExt[]> {
  try {
    await injectedPromise

    const accounts = await web3Accounts()

    return accounts.map(
      ({ address, meta }, whenCreated): InjectedAccountExt => ({
        address,
        meta: objectSpread({}, meta, {
          whenCreated,
        }),
      }),
    )
  } catch (error) {
    console.error('web3Accounts', error)
    return []
  }
}

async function retrieve(api: ApiPromise, injectedPromise: Promise<InjectedExtension[]>): Promise<ChainData> {
  const [systemChain, systemChainType, systemName, systemVersion, injectedAccounts] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.chainType ? api.rpc.system.chainType() : {},
    api.rpc.system.name(),
    api.rpc.system.version(),
    getInjectedAccounts(injectedPromise),
  ])

  return {
    injectedAccounts: injectedAccounts.filter(({ meta: { source } }) => !DISALLOW_EXTENSIONS.includes(source)),
    properties: registry.createType('ChainProperties', {
      ss58Format: api.registry.chainSS58,
      tokenDecimals: api.registry.chainDecimals,
      tokenSymbol: api.registry.chainTokens,
    }) as ChainProperties,
    systemChain: (systemChain || '<unknown>').toString(),
    systemChainType: systemChainType as ChainType,
    systemName: systemName.toString(),
    systemVersion: systemVersion.toString(),
  }
}

async function loadOnReady(
  api: ApiPromise,
  injectedPromise: Promise<InjectedExtension[]>,
  store: KeyringStore | undefined,
): Promise<ApiState> {
  const { injectedAccounts, properties, systemChain, systemChainType, systemName, systemVersion } = await retrieve(
    api,
    injectedPromise,
  )
  const chainSS58 = properties.ss58Format.unwrapOr(DEFAULT_SS58).toNumber()
  const ss58Format = chainSS58
  const tokenSymbol = properties.tokenSymbol.unwrapOr([formatBalance.getDefaults().unit, ...DEFAULT_AUX])
  const tokenDecimals = properties.tokenDecimals.unwrapOr([DEFAULT_DECIMALS])
  const isEthereum = ethereumChains.includes(api.runtimeVersion.specName.toString())
  const isDevelopment = systemChainType.isDevelopment || systemChainType.isLocal || isTestChain(systemChain)

  console.log(`chain: ${systemChain} (${systemChainType.toString()}), ${stringify(properties)}`)

  // explicitly override the ss58Format as specified
  registry.setChainProperties(
    registry.createType('ChainProperties', { ss58Format, tokenDecimals, tokenSymbol }) as ChainProperties,
  )

  // first setup the UI helpers
  formatBalance.setDefaults({
    decimals: tokenDecimals.map((b) => b.toNumber()),
    unit: tokenSymbol[0].toString(),
  })

  // finally load the keyring
  isKeyringLoaded() ||
    keyring.loadAll(
      {
        genesisHash: api.genesisHash,
        isDevelopment,
        ss58Format,
        store,
        type: isEthereum ? 'ethereum' : 'ed25519',
      },
      injectedAccounts,
    )

  const defaultSection = Object.keys(api.tx)[0]
  const defaultMethod = Object.keys(api.tx[defaultSection])[0]
  const apiDefaultTx = api.tx[defaultSection][defaultMethod]
  const apiDefaultTxSudo = (api.tx.system && api.tx.system.setCode) || apiDefaultTx

  setDeriveCache(api.genesisHash.toHex(), deriveMapCache)

  return {
    apiDefaultTx,
    apiDefaultTxSudo,
    chainSS58,
    hasInjectedAccounts: injectedAccounts.length !== 0,
    isApiReady: true,
    isDevelopment: isEthereum ? false : isDevelopment,
    isEthereum,
    specName: api.runtimeVersion.specName.toString(),
    specVersion: api.runtimeVersion.specVersion.toString(),
    systemChain,
    systemName,
    systemVersion,
  }
}

const apiEndpoint = 'wss://wss-fullnodes-testnet.glitch.finance'

const PolkadotApiProvider: React.FC<{ children: React.ReactNode }> = memo(({ children }) => {
  const [isApiConnected, setIsApiConnected] = useState<boolean>(false)
  const [isApiInitialized, setIsApiInitialized] = useState<boolean>(false)
  // const [apiError, setApiError] = useState<null | string>(null)
  const [extensions, setExtensions] = useState<InjectedExtension[] | undefined>()

  const [accountSelected, setAccountSelected] = useState<string>(null)

  const onError = useCallback((error: unknown): void => {
    toast.error((error as Error).message)
  }, [])

  useEffect(() => {
    createApi(apiEndpoint, onError)
      .then(() => {
        api.on('connected', () => setIsApiConnected(true))
        api.on('disconnected', () => setIsApiConnected(false))
        api.on('ready', () => {
          const injectedPromise = web3Enable('bridge.glitch.finance')
          injectedPromise.then(setExtensions).catch(onError)
          loadOnReady(api, injectedPromise, undefined)
            .then(() => {
              setIsApiInitialized(true)
            })
            .catch(onError)
        })
      })
      .catch(onError)
  }, [])

  return (
    <PolkadotApiContext.Provider
      value={{
        api,
        accountSelected,
        setAccountSelected,
        isApiConnected,
        isApiInitialized,
        isHasExtension: !!extensions?.length,
      }}
    >
      {children}
    </PolkadotApiContext.Provider>
  )
})

PolkadotApiProvider.displayName = 'PolkadotApiProvider'

export default PolkadotApiProvider
