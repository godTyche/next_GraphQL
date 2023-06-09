import { useState } from 'react'
import Head from 'next/head'
import { useInputState } from '@mantine/hooks'
import { HeaderSimple } from '@/components/Header'
import {
  Grid,
  Container,
  TextInput,
  useMantineTheme,
  ActionIcon,
  Text,
  Card,
  Avatar,
  Button,
} from '@mantine/core'
import {
  IconSearch,
  IconArrowRight,
  IconArrowLeft,
  IconLink,
  IconStarFilled,
  IconStar,
} from '@tabler/icons-react'
import { useQuery, useMutation } from '@apollo/client'
import { SEARCH_REPOS, ADD_STAR_MUTATION, REMOVE_STAR_MUTATION } from '@/graphql/schema'
import SkeletonResults from '@/components/SkeletonResults'
import { useStyles } from '@/styles/SearchPage'
import Link from 'next/link'

type Color = string

interface nodeValue {
  createdAt: string
  id: string
  name: string
  stargazerCount: string
  url: URL
  viewerHasStarred: Boolean
  owner: {
    avatarUrl: string
    url: string
    name: string
    login: string
  }
  primaryLanguage: {
    color: Color
    name: string
  }
}

const Search = () => {
  const { classes } = useStyles()
  const theme = useMantineTheme()
  const [stringValue, setStringValue] = useInputState<
    string | number | readonly string[] | undefined
  >('')
  const [searchText, setSearchText] = useState<string | number | readonly string[] | undefined>('')
  const [before, setBefore] = useState<null | Number>(null)
  const [after, setAfter] = useState<null | Number>(null)
  const [first, setFirst] = useState<null | Number>(10)
  const [last, setLast] = useState<null | Number>(null)

  const [addStar] = useMutation(ADD_STAR_MUTATION)
  const [removeStar] = useMutation(REMOVE_STAR_MUTATION)

  const searchRepo = (e: any) => {
    e.preventDefault()
    if (e.keyCode === 13 || !e.keyCode) setSearchText(stringValue)
  }

  const nextPage = () => {
    setBefore(null)
    setLast(null)
    setFirst(10)
    setAfter(data?.search.pageInfo.endCursor)
  }

  const prevPage = () => {
    setAfter(null)
    setFirst(null)
    setLast(10)
    setBefore(data?.search.pageInfo.startCursor)
  }

  const { loading, error, data, refetch } = useQuery(SEARCH_REPOS, {
    variables: {
      query: searchText,
      type: 'REPOSITORY',
      first: first,
      last: last,
      before: before,
      after: after,
    },
  })

  const clickStar = async (id: String, starred: Boolean) => {
    if (starred) {
      await removeStar({
        variables: {
          id: id,
        },
      })
    } else {
      await addStar({
        variables: {
          id: id,
        },
      })
    }
    refetch()
  }

  return (
    <>
      <Head>
        <title>Search repositories</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <HeaderSimple />
      <Container>
        <Grid>
          <Grid.Col xs={6} md={4}>
            <TextInput
              icon={<IconSearch size='1.1rem' stroke={1.5} />}
              radius='xl'
              size='md'
              rightSection={
                <ActionIcon
                  size={32}
                  radius='xl'
                  color={theme.primaryColor}
                  variant='filled'
                  onClick={(e) => searchRepo(e)}
                >
                  {theme.dir === 'ltr' ? (
                    <IconArrowRight size='1.1rem' stroke={1.5} />
                  ) : (
                    <IconArrowLeft size='1.1rem' stroke={1.5} />
                  )}
                </ActionIcon>
              }
              placeholder='Search repositories'
              rightSectionWidth={42}
              value={stringValue}
              onChange={setStringValue}
              onKeyUp={(e) => searchRepo(e)}
            />
          </Grid.Col>
        </Grid>
        <Grid>
          {loading ? (
            <SkeletonResults />
          ) : (
            <>
              {data?.search.repositoryCount ? (
                <>
                  <Grid.Col xs={12}>
                    <Text>{data?.search.repositoryCount} results</Text>
                  </Grid.Col>

                  {data?.search.nodes.map((node: nodeValue, index: number) => {
                    return (
                      <Grid.Col xs={12} key={index}>
                        <Card withBorder p='xl' radius='md' className={classes.card}>
                          <Card.Section>
                            <Link className={classes.link} href={node.url}>
                              <IconLink className={classes.linkIcon} />
                              {node.name}
                            </Link>
                          </Card.Section>
                          <Card.Section className={classes.userInfo}>
                            <Avatar src={node.owner.avatarUrl} radius='xl' />
                            <Link href={node.owner.url} className={classes.username}>
                              <Text>{node.owner.login}</Text>
                            </Link>
                          </Card.Section>
                          <Card.Section className={classes.footer}>
                            <div className={classes.primaryLanguage}>
                              <span
                                className={classes.languageIcon}
                                style={{ backgroundColor: node.primaryLanguage?.color }}
                              ></span>
                              {node.primaryLanguage?.name}
                            </div>

                            <div className={classes.stargazer}>
                              <ActionIcon
                                variant='transparent'
                                onClick={() => clickStar(node.id, node.viewerHasStarred)}
                              >
                                {node.viewerHasStarred ? (
                                  <IconStarFilled className={classes.starIcon} />
                                ) : (
                                  <IconStar className={classes.starIcon} />
                                )}
                              </ActionIcon>
                              <Text>{node.stargazerCount}</Text>
                            </div>
                          </Card.Section>
                        </Card>
                      </Grid.Col>
                    )
                  })}
                </>
              ) : (
                <Grid.Col xs={12}>{searchText ? <Text>{'No result. :('}</Text> : <></>}</Grid.Col>
              )}
              <Grid className={classes.paginate}>
                <Button
                  leftIcon={<IconArrowLeft />}
                  className={classes.button}
                  variant='outline'
                  onClick={prevPage}
                  disabled={!data?.search.pageInfo.hasPreviousPage}
                >
                  Previous
                </Button>
                <Button
                  rightIcon={<IconArrowRight />}
                  className={classes.button}
                  variant='outline'
                  onClick={nextPage}
                  disabled={!data?.search.pageInfo.hasNextPage}
                >
                  Next
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </>
  )
}

export default Search
