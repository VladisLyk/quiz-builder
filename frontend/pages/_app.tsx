import { ThemeProvider } from '@mui/material';
import { theme } from '_/utils/theme';
import type { AppProps } from 'next/app';

import '_/utils/global.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <ThemeProvider theme={theme}>
    <Component {...pageProps} />
  </ThemeProvider>;
}
