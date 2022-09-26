export const tags = {
  H1: 'h1',
  H2: 'h2',
  H4: 'h4',
  H5: 'h5',
}

export type Tags = typeof tags[keyof typeof tags]

export interface HeadingProps {
  as?: Tags
  color?: string
  textTransform?: 'uppercase'
}
