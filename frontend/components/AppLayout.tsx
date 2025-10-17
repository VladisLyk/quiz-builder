// components/AppLayout.tsx
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import type { AppLayoutProps } from '_/types/appLayout.type';

export default function AppLayout({
  pageTitle = 'Quiz Builder',
  children,
}: AppLayoutProps) {
  const router = useRouter();

  const nav = [
    { label: 'Quizzes', href: '/quizzes' },
    { label: 'Create quiz', href: '/create' },
  ];

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <AppBar position="static">
        <Toolbar sx={{ gap: 1 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {pageTitle}
          </Typography>

          {nav.map((item) => {
            const active = router.pathname === item.href;
            return (
              <Button
                key={item.href}
                component={Link}
                href={item.href}
                color={active ? 'inherit' : 'secondary'}
                variant={active ? 'outlined' : 'text'}
                sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.7)' }}
              >
                {item.label}
              </Button>
            );
          })}
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>{children}</Box>
    </>
  );
}
