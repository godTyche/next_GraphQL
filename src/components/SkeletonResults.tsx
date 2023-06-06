import { Skeleton, Grid } from '@mantine/core'

const child = <Skeleton height={50} radius='md' animate={true} />

const SkeletonResults = () => {
  return (
    <>
      <Grid.Col xs={12}>{child}</Grid.Col>
      <Grid.Col xs={12}>{child}</Grid.Col>
      <Grid.Col xs={12}>{child}</Grid.Col>
      <Grid.Col xs={12}>{child}</Grid.Col>
      <Grid.Col xs={12}>{child}</Grid.Col>
      <Grid.Col xs={12}>{child}</Grid.Col>
      <Grid.Col xs={12}>{child}</Grid.Col>
      <Grid.Col xs={12}>{child}</Grid.Col>
      <Grid.Col xs={12}>{child}</Grid.Col>
    </>
  )
}

export default SkeletonResults
