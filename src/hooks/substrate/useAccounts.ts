// Copyright 2017-2022 @polkadot/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { SubjectInfo } from '@polkadot/ui-keyring/observable/types'

import { useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'

import { keyring } from '@polkadot/ui-keyring'
import { u8aToHex } from '@polkadot/util'
import { decodeAddress } from '@polkadot/util-crypto'

import { usePolkadotApi } from 'contexts/PolkadotApi/hooks'

import { createNamedHook } from '../createNamedHook'
import { useIsMountedRef } from '../useIsMountedRef'

export interface UseAccounts {
  allAccounts: string[]
  allAccountsHex: string[]
  areAccountsLoaded: boolean
  hasAccounts: boolean
  isAccount: (address?: string | null) => boolean
}

const EMPTY: UseAccounts = {
  allAccounts: [],
  allAccountsHex: [],
  areAccountsLoaded: false,
  hasAccounts: false,
  isAccount: () => false,
}

function extractAccounts(accounts: SubjectInfo = {}): UseAccounts {
  const allAccounts = Object.keys(accounts)
  const allAccountsHex = allAccounts.map((a) => u8aToHex(decodeAddress(a)))
  const hasAccounts = allAccounts.length !== 0
  const isAccount = (address?: string | null) => !!address && allAccounts.includes(address)

  return { allAccounts, allAccountsHex, areAccountsLoaded: true, hasAccounts, isAccount }
}

function useAccountsImpl(): UseAccounts {
  const mountedRef = useIsMountedRef()
  const { setAccountSelected, allAccounts } = usePolkadotApi()
  const [state, setState] = useState<UseAccounts>(EMPTY)

  useEffect((): (() => void) => {
    const subscription = keyring.accounts.subject.subscribe((accounts = {}) => {
      if (mountedRef.current) {
        const transformAccounts =
          isEmpty(accounts) && allAccounts?.length
            ? {
                allAccounts,
                allAccountsHex: [],
                areAccountsLoaded: true,
                hasAccounts: true,
                isAccount: (address?: string | null) => !!address && allAccounts.includes(address),
              }
            : extractAccounts(accounts)
        setState(transformAccounts)
        setAccountSelected(transformAccounts.allAccounts?.[0])
      }
    })

    return (): void => {
      setTimeout(() => subscription.unsubscribe(), 0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mountedRef, allAccounts])

  return state
}

export const useAccounts = createNamedHook('useAccounts', useAccountsImpl)
