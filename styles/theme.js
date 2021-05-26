import { extendTheme } from '@chakra-ui/react'

export const customTheme = extendTheme({
  styles: {
    global: {
      html: {
        minWidth: '360px',
        scrollBehavior: 'smooth',
      },
      '#__next': {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      },
    },
  },
  fonts: {
    body: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
  },
  fontWeight: {
    normal: 400,
    bold: 700,
  },
})
