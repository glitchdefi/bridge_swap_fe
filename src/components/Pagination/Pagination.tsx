import React from 'react'
import tw from 'twin.macro'
import { CSSProp } from 'styled-components'

const Wrapper = tw.div`
 flex 
 mt-7
 mb-2
 items-center 
 justify-start 
 lg:justify-end 
 w-full
`

interface Props {
  containerStyles?: CSSProp
  current: number
  isDisabledNext: boolean
  onChange: (page: number) => void
}

export const Pagination: React.FC<Props> = (props) => {
  const { containerStyles, current, isDisabledNext, onChange } = props

  return (
    <>
      <Wrapper css={containerStyles}>
        <ul className="rc-pagination">
          <li title="Previous Page" className={`rc-pagination-prev ${current === 0 ? 'rc-pagination-disabled' : ''}`}>
            <button
              type="button"
              aria-label="prev page"
              className="rc-pagination-item-link"
              onClick={() => current > 0 && onChange(current - 1)}
            />
          </li>
          <li title="Next Page" className={`rc-pagination-next ${isDisabledNext ? 'rc-pagination-disabled' : ''}`}>
            <button
              type="button"
              aria-label="next page"
              className="rc-pagination-item-link"
              onClick={() => !isDisabledNext && onChange(current + 1)}
            />
          </li>
        </ul>
        {/* <RcPagination locale={localeEN} current={current} total={total} pageSize={pageSize} onChange={onChange} /> */}
        {/* <Options onChange={(pageSize) => onChange(1, pageSize)} /> */}
      </Wrapper>
    </>
  )
}
