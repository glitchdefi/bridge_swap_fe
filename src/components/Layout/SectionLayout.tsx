import { Box, BoxProps } from '../Box'

const SectionLayout: React.FC<BoxProps> = ({ children, ...props }) => (
  <Box className="py-12 xl:py-20" {...props}>
    {children}
  </Box>
)

export default SectionLayout
