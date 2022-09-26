import { TextProps } from 'components/Text'

export const tags = {
  BODY: 'body',
}

export type Tags = typeof tags[keyof typeof tags]

export interface ParagraphProps extends TextProps {
  as?: string
  variant?: Tags
}
