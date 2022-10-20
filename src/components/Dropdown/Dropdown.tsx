/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from 'react'
import { styled, theme } from 'twin.macro'

import { useOnClickOutside } from 'hooks/useOnClickOutside'

import { CheckIcon } from 'components/Svg'
import { Text } from 'components/Text'

const DropdownWrapper = styled.div`
  position: relative;
`

const DropdownContent = styled.div<{ width?: number }>`
  position: absolute;
  left: 0px;
  right: 0px;
  background-color: ${theme`colors.color3`};
  filter: drop-shadow(0px 8px 32px #000c17);
  z-index: 999;
  overflow: hidden;
  opacity: 0;
  height: 0px;
  transition: all 0.2s ease;
  width: ${({ width }) => `${width}px` || 'auto'};

  &.is-opened {
    opacity: 1;
    height: auto;
  }
`

interface Props {
  isOpen: boolean
  className?: string
  contentCls?: string
  width?: number
  children?: React.ReactNode
  button?: React.ReactNode
  value?: any
  stickyTitle?: string
  items?: { icon?: string; iconCls?: string; value?: any; label?: string }[]
  onClose?: () => void
  onChange?: (value: any) => void
}

export const Dropdown: React.FC<Props> = (props) => {
  const { isOpen, value, className, contentCls, width, children, items, stickyTitle, onClose, onChange, button } = props

  const ref = useRef<HTMLDivElement>()
  useOnClickOutside(ref, () => onClose && onClose())

  return (
    <DropdownWrapper ref={ref} className={className}>
      {React.isValidElement(button) && (
        <div role="button" tabIndex={0}>
          {React.cloneElement(button)}
        </div>
      )}
      <DropdownContent width={width} className={`dropdown-content ${contentCls} ${isOpen ? 'is-opened' : ''}`}>
        {items?.length ? (
          <div>
            {stickyTitle && (
              <Text className="mx-4 mt-3 mb-2" fontSize="12px" lineHeight="20px" color={theme`colors.color7`}>
                {stickyTitle}
              </Text>
            )}
            {items.map((item, index: number) => {
              const isSelected = item.value?.length && value ? item.value.includes(value) : item.value === value
              return (
                <div
                  role="button"
                  tabIndex={0}
                  key={`${index}`}
                  className="flex items-center justify-between p-4 cursor-pointer border-b border-color4"
                  onClick={() => {
                    if (!isSelected) {
                      onChange && onChange(item.value)
                      onClose && onClose()
                    }
                  }}
                >
                  <div className="flex items-center">
                    {item.icon && (
                      <img className={`mr-3 w-5 h-5 ${item.iconCls}`} src={item.icon} alt="dropdown-icon" />
                    )}
                    <Text color={isSelected ? theme`colors.primary` : theme`colors.color8`}>{item.label}</Text>
                  </div>
                  {isSelected && <CheckIcon width={16} height={16} color={theme`colors.primary`} />}
                </div>
              )
            })}
          </div>
        ) : (
          children
        )}
      </DropdownContent>
    </DropdownWrapper>
  )
}
