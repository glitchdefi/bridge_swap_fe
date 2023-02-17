import React, { useCallback, useState } from 'react'
import { styled, theme } from 'twin.macro'

// Components
import { Text } from 'components/Text'
import { Dropdown } from 'components/Dropdown'
import { CheckIcon, OutlineDownArrow } from 'components/Svg'

const Wrapper = styled.div`
  .select-network-btn {
    border: 1px solid ${theme`colors.color4`};
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 8px;
    padding-right: 8px;
    user-select: none;
  }
`

export type AddressDropdownTypes = { value: string; label: string; isEthAddress: boolean }

interface SelectWalletViewProps {
  addressSelected: AddressDropdownTypes
  setAddressSelected: (addr: AddressDropdownTypes) => void
  data: AddressDropdownTypes[]
}

export const SelectWalletView: React.FC<SelectWalletViewProps> = (props) => {
  const { data, addressSelected, setAddressSelected } = props

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev: boolean) => !prev)
  }, [])

  return (
    <Wrapper className="flex items-center">
      <Text className="mr-4" color={theme`colors.color7`}>
        Select wallet:
      </Text>
      <Dropdown
        width={220}
        isOpen={isOpen}
        button={
          <div role="button" tabIndex={0} className="flex items-center select-network-btn" onClick={toggleDropdown}>
            <img
              className="w-5 h-5"
              src={addressSelected?.isEthAddress ? './images/logo-metamask.png' : './images/logo.png'}
              alt="logo"
            />
            <Text className="mx-2">{addressSelected?.label}</Text>
            <OutlineDownArrow width={12} height={12} />
          </div>
        }
        onClose={() => setIsOpen(false)}
      >
        <div>
          {data?.map((o) => {
            const isSelected = addressSelected?.value === o.value
            return (
              <div
                key={o.value}
                role="button"
                tabIndex={0}
                className="flex items-center justify-between p-4 border-b cursor-pointer border-color4"
                onClick={() => {
                  setAddressSelected(o)
                  toggleDropdown()
                }}
              >
                <div className="flex items-center">
                  <img
                    className="w-5 h-5 mr-3"
                    src={o.isEthAddress ? './images/logo-metamask.png' : './images/logo.png'}
                    alt="logo"
                  />
                  <Text color={isSelected ? theme`colors.primary` : theme`colors.color9`}>{o.label}</Text>
                </div>
                {isSelected && <CheckIcon width={16} height={16} color={theme`colors.primary`} />}
              </div>
            )
          })}
        </div>
      </Dropdown>
    </Wrapper>
  )
}
