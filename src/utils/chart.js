import moment from 'moment';
import numeral from 'numeral';

const getRankMax = dataList => {
  const ranks = dataList.map(item => item.coinRank);
  const realMax = Math.max(...ranks);
  if (realMax > 10) {
    return parseInt(realMax * 1.6, 10);
  }
  if (realMax > 50) {
    return parseInt(realMax * 1.2, 10);
  }
  return 15;
};

const getRankMin = dataList => {
  const ranks = dataList.map(item => item.coinRank);
  const realMin = Math.min(...ranks);
  if (realMin > 10) {
    return realMin - 10;
  }
  return 1;
};

export const getOption = (currentData, coinCode, coinName) => {
  if (!currentData) {
    return {
      title: {
        text: `${coinCode} - ${coinName}`,
        textStyle: {
          color: '#f8f9fa',
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: '#f8f9fa',
          },
        },
      },
      yAxis: {
        type: 'value',
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: '#f8f9fa',
          },
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          color: '#f8f9fa',
        },
      },
      series: [],
    };
  }

  return {
    title: {
      text: `${coinCode} - ${coinName}`,
      textStyle: {
        color: '#f8f9fa',
      },
    },
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '3%',
      right: '3%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: '#f8f9fa',
        },
      },
      data: currentData.map(i =>
        moment(i.recordDate, 'MMM DD, YYYY').format('L')
      ),
    },
    yAxis: [
      {
        type: 'value',
        minInterval: 1,
        inverse: true,
        min: getRankMin(currentData),
        max: getRankMax(currentData),
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: '#f8f9fa',
          },
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          color: '#f8f9fa',
        },
      },
      {
        type: 'value',
        min: function(value) {
          return value.min - (value.max - value.min) * 0.1;
        },
        max: function(value) {
          return value.max * 1.8;
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: '#f8f9fa',
          },
        },
        axisLabel: {
          formatter: function(item) {
            return numeral(item).format('($0a)');
          },
          color: '#f8f9fa',
        },
        splitLine: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: 'Rank',
        type: 'line',
        step: 'end',
        yAxisIndex: 0,
        data: currentData.map(i => i.coinRank),
        lineStyle: {
          normal: {
            color: '#f1f3f5',
          },
        },
      },
      {
        name: 'Market Cap',
        yAxisIndex: 1,
        type: 'line',
        smooth: true,
        areaStyle: {
          normal: {
            color: '#f1f3f5',
          },
        },
        data: currentData.map(i => i.marketCap),
        lineStyle: {
          normal: {
            color: '#f1f3f5',
          },
        },
      },
    ],
    visualMap: [
      {
        show: false,
        type: 'continuous',
        seriesIndex: 1,
        min: 0,
        max: 400,
      },
    ],
  };
};
