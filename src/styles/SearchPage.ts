import { createStyles } from '@mantine/core'

export const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    borderColor: '#30363d',
    border: '1px solid',
  },
  avatar: {
    width: '100%',
    height: 'fit-content',
  },
  name: {
    fontSize: 28,
    color: 'white',
    fontWeight: 700,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 700,
  },
  linkIcon: {
    width: 16,
    marginRight: 5,
  },
  userInfo: {
    marginTop: 10,
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
  },
  username: {
    marginLeft: 5,
    textDecoration: 'none',
    color: 'white',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  primaryLanguage: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
  },
  languageIcon: {
    display: 'inline-block',
    width: 10,
    height: 10,
    borderRadius: '100%',
    marginRight: 5,
  },
  stargazer: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
  },
  starIcon: {
    width: 18,
    color: '#e3b341',
  },
  paginate: {
    width: '100%',
    marginTop: 20,
    justifyContent: 'center',
  },
  button: {
    border: 'none',
    color: 'white',

    '&:disabled': {
      color: '#4a4a4a',
      backgroundColor: 'transparent',
    },
  },
}))
