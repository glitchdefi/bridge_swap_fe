/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { memo, useMemo, useState } from 'react'
import { styled, theme } from 'twin.macro'

// Components
import { Dropdown } from 'components/Dropdown'
import { Text } from 'components/Text'
import { OutlineDownArrow } from 'components/Svg'

const SelectInput = styled.div`
  padding: 16px;
  border: 1px solid ${theme`colors.color4`};
  user-select: none;
  cursor: pointer;
  flex: 1;
  width: 100%;
  transition: all 0.3s ease;

  &:hover {
    border: 1px solid ${theme`colors.primary`};
  }
`

interface Props {
  isFrom?: boolean
  value: number
  onChange: (value: number) => void
  list: any[]
}

export const SelectNetwork: React.FC<Props> = memo((props) => {
  const [openNetworkDropdown, setOpenNetworkDropdown] = useState<boolean>(false)
  const networkSelected = useMemo(() => {
    if (props.value) {
      return props.list.find((n) => n.chainIds.includes(props.value))
    }
    return null
  }, [props.value, props.list])

  return (
    <Dropdown
      className="flex-1 w-full"
      isOpen={openNetworkDropdown}
      value={props.value}
      button={
        <SelectInput onClick={() => setOpenNetworkDropdown((prev) => !prev)}>
          <Text fontSize="12px" mb="8px" color={theme`colors.color6`}>
            {props.isFrom ? 'From' : 'To'} network
          </Text>
          {networkSelected ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img className="w-6 h-6 mr-3" src={networkSelected.icon} alt="network-icon" />
                <Text fontSize="18px" color={theme`colors.color7`}>
                  {networkSelected.label}
                </Text>
              </div>
              <OutlineDownArrow />
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <Text fontSize="18px" color={theme`colors.color7`}>
                Select network
              </Text>
              <OutlineDownArrow />
            </div>
          )}
        </SelectInput>
      }
      items={props.list}
      onClose={() => setOpenNetworkDropdown(false)}
      onChange={(value) => props.onChange(value[1])}
    />
  )
})

SelectNetwork.displayName = 'SelectNetwork'
