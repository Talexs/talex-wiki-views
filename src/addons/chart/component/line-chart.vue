<template>
  <div id="area"></div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { Area } from '@antv/g2plot'

export default {
  name: 'Line',
  data() {
    return {
      data: [
        {
          Date: '2021-07',
          scales: 83
        },
        {
          Date: '2021-08',
          scales: 86
        },
        {
          Date: '2021-09',
          scales: 74
        },
        {
          Date: '2021-10',
          scales: 98
        },
        {
          Date: '2021-11',
          scales: 78
        },
        {
          Date: '2021-12',
          scales: 95
        },
        {
          Date: '2022-01',
          scales: 45
        },
        {
          Date: '2022-02',
          scales: 67
        },
        {
          Date: '2022-03',
          scales: 47
        },
        {
          Date: '2022-04',
          scales: 97
        },
        {
          Date: '2022-05',
          scales: 67
        },
        {
          Date: '2022-06',
          scales: 57
        },
        {
          Date: '2022-07',
          scales: 33
        }
      ]
    }
  },
  mounted() {
    new Area('area', {
      data: this.data,
      xField: 'Date',
      yField: 'scales',
      xAxis: {
        range: [0, 1],
        tickCount: 5,
      },
      smooth: true,
      areaStyle: () => ({
        fill: 'l(270) 0:#ffffff00 1:#1890ff'
      }),
    }).render()
  },
}
</script>

<style scoped></style>
