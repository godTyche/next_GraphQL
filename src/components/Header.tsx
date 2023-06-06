import { useState } from 'react'
import { createStyles, Header, Container, Group, Burger, rem } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Link from 'next/link'
import { useRouter } from 'next/router'

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}))

const links = [
  {
    link: '/',
    label: 'Home',
  },
  {
    link: '/search',
    label: 'Search',
  },
]

export function HeaderSimple() {
  const [opened, { toggle }] = useDisclosure(false)
  const { classes, cx } = useStyles()
  const router = useRouter()

  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={cx(classes.link, { [classes.linkActive]: router.pathname === link.link })}
    >
      {link.label}
    </Link>
  ))

  return (
    <Header height={60} mb={20}>
      <Container className={classes.header}>
        <Group spacing={5}>{items}</Group>
      </Container>
    </Header>
  )
}
