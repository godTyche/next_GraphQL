import { Skeleton, Grid } from '@mantine/core'

const child = <Skeleton height={100} radius='md' animate={true} />

const SkeletonRepos = () => {
  return (
    <>
      <Grid.Col xs={6} md={4}>
        {child}
      </Grid.Col>
      <Grid.Col xs={6} md={4}>
        {child}
      </Grid.Col>
      <Grid.Col xs={6} md={4}>
        {child}
      </Grid.Col>
      <Grid.Col xs={6} md={4}>
        {child}
      </Grid.Col>
      <Grid.Col xs={6} md={4}>
        {child}
      </Grid.Col>
      <Grid.Col xs={6} md={4}>
        {child}
      </Grid.Col>
      <Grid.Col xs={6} md={4}>
        {child}
      </Grid.Col>
      <Grid.Col xs={6} md={4}>
        {child}
      </Grid.Col>
      <Grid.Col xs={6} md={4}>
        {child}
      </Grid.Col>
    </>
  )
}

export default SkeletonRepos
