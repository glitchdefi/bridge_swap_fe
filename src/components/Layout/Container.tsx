import { Box, BoxProps } from '../Box'

const Container: React.FC<BoxProps> = ({ children, ...props }) => (
  <Box className="px-5 sm:px-7 lg:px-10 container" mx="auto" {...props}>
    {children}
  </Box>
)

export default Container
