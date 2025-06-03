export const getWeekOptions = () => {
  return {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  }
}

const grid = {
  left: '3%',
  right: '3%',
  width: '94%',
  height: '94%',
  bottom: '3%',
  top: '3%',
  containLabel: true
}
export const getPieOptions = () => {
  const datas = [
    { value: 40, name: '苹果' },
    { value: 132, name: '荔枝' },
    { value: 55, name: '石榴' }
  ]

  const option = {
    grid,
    color: ['#2c90ff', '#FFC400', '#99D155', '#1AD979', '#22E5E5', '#FF8D3A'],
    legend: {
      top: '10%',
      left: '5%',
      orient: 'vertical',
      data: datas,
      icon: 'rect',
      itemWidth: 16,
      itemHeight: 10
    },
    tooltip: {
      show: true,
      axisPointer: {
        type: 'shadow'
      },
      backgroundColor: 'rgba(255, 255, 255, .9)',
      borderWidth: 1,
      textStyle: {
        color: '#60646F',
        fontSize: 12
      },
      extraCssText: 'width: 148px;  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.05);',
      formatter: function (params) {
        let str =
          (params.data &&
            `<div style="display:flex; justify-content: space-between; align-items: center;">
                <span>${params.data.name}</span> 
                <span>${params.data.value}</span>
            </div>`) ||
          ''
        return str
      }
    },
    series: [
      {
        name: 'xxx',
        type: 'pie',
        center: ['50%', '50%'],
        radius: ['52%', '70%'],
        clockwise: true, //饼图的扇区是否是顺时针排布
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        data: datas
      }
    ]
  }

  return option
}

export const getBarOptions = () => {
  const data = [5, 20, 36, 10, 10, 20, 51, 25, 30, 18, 6, 42]
  const dataX = [
    '衬衫',
    '羊毛衫',
    '雪纺衫',
    '裤子',
    '高跟鞋',
    '袜子',
    '衬衫2',
    '羊毛衫2',
    '雪纺衫2',
    '裤子2',
    '高跟鞋2',
    '袜子2'
  ]
  const option = {
    grid,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      },
      formatter: function (params) {
        return params[0].name + '<br/>' + params[0].seriesName + ' : ' + params[0].value + '元'
      }
    },
    legend: {
      data: ['销量']
    },
    xAxis: {
      data: dataX
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: data,
        barWidth: '40%',
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#00F0FF'
              },
              {
                offset: 1,
                color: '#0066FF'
              }
            ]
          },
          borderRadius: [2, 2, 0, 0]
        },
        label: {
          show: true,
          position: 'top',
          color: '#fff',
          fontSize: 12
        }
      }
    ]
  }
  return option
}

export const getLineOptions = () => {
  let yAxisData = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
  let data = [100, 90, 200, 250, 240, 500, 120, 390, 480, 270, 290, '-']
  // 进行线的截断
  const option = {
    grid,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      textStyle: {
        color: '#fff',
        fontSize: 12
      },
      confine: true, // 超出范围
      backgroundColor: 'rgba(17,95,182,0.5)', //设置背景颜色
      formatter: function (item) {
        let params = [...item]
        var res = params[0].name + '<br/>'
        for (var i = 0, l = params.length; i < l; i++) {
          res +=
            params[i].value !== '-'
              ? params[i].marker + params[i].seriesName + ' : ' + params[i].value + ' %<br/>'
              : ''
        }
        return res
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#94A7BD' //轴线和单位颜色
        }
      },
      data: yAxisData
    },
    yAxis: {
      type: 'value',
      name: '例',
      nameTextStyle: {
        fontSize: 14,
        color: '#94A7BD',
        padding: [0, 0, 0, -45]
      },
      axisLine: {
        lineStyle: {
          color: '#94A7BD' //轴线和单位颜色
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#182D46',
          type: [2, 3],
          dashOffset: 2
        }
      }
    },
    series: [
      {
        name: '数据',
        type: 'line',
        // symbolSize: 10,
        symbol: 'none',
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(54,161,255,0.6)' // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(25,104,255,0)' // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
        },
        lineStyle: {
          color: '#2695FE',
          width: 2,
          type: 'solid'
        },
        // 最高点标点
        data: data.map((item) => {
          const maxValue = Math.max(...data.filter((item) => item != '-'))
          const minVlaue = Math.min(...data.filter((item) => item != '-'))
          if (item === maxValue || item === minVlaue) {
            return {
              value: item,
              symbol: 'circle',
              symbolSize: 8,
              itemStyle: { color: 'yellow', shadowColor: 'rgba(255,255,255,0.6)', shadowBlur: 10 }
            }
          }

          return item
        })
      },
      {
        name: '数据2',
        type: 'line',
        // symbolSize: 10,
        symbol: 'none',
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(0,255,0,0.6)' // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(25,104,255,0)' // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
        },
        lineStyle: {
          color: 'red',
          width: 2,
          type: 'solid'
        },
        // 最高点标点
        data: data.map((item) => {
          const maxValue = Math.max(...data.filter((item) => item != '-'))
          const minVlaue = Math.min(...data.filter((item) => item != '-'))
          if (item === maxValue || item === minVlaue) {
            return {
              value: item + 100,
              symbol: 'circle',
              symbolSize: 8,
              itemStyle: { color: '#fff', shadowColor: 'rgba(255,255,255,0.6)', shadowBlur: 10 }
            }
          }
          return item != '-' ? item + 100 : '-'
        })
      }
    ]
  }
  return option
}
