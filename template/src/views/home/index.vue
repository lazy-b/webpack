<template>
  <div class="app-container text-center">
    <section>
      <ul>
        <li v-for="(item, index) in totalData" :key="index" class="data-item">
          <div class="number">\{{item.number | numberFilter}}</div>
          <div class="title">\{{item.title}}</div>
        </li>
      </ul>
    </section>
    <section class="echart">
      <header>
        <div class="blue-left mr10"></div>
        <div class="title">近12个月会员增长趋势</div>
      </header>
      <div id="report" class="report"></div>
    </section>
  </div>
</template>

<script>
  import { basic } from '@/api';
  import Echarts from 'echarts';
  export default {
    data() {
      return {
        totalData: [
          {
            number: 0,
            title: '会员总数'
          },
          {
            number: 0,
            title: '昨日新增会员'
          },
          {
            number: 0,
            title: '会员剩余总积分'
          }
        ],
        dateList: [],
        numberList: [],
        chart: null
      };
    },
    filters: {
      numberFilter(num) {
        let result = [ ];
        let counter = 0;
        // let isDot = false;
        let index = ((num || 0).toString()).indexOf('.');
        if (index !== -1) {
          let NumNoDut = num.toString().substring(0, index);
          let offDut = num.toString().substring(index, num.toString().length);
          NumNoDut = NumNoDut.split('');
          for (let i = NumNoDut.length - 1; i >= 0; i--) {
            counter++;
            result.unshift(NumNoDut[i]);
            if (!(counter % 3) && i !== 0) {
              result.unshift(',');
            }
          }
          return result.join('') + offDut;
        } else {
          num = (num || 0).toString().split('');
          for (let i = num.length - 1; i >= 0; i--) {
            counter++;
            result.unshift(num[i]);
            if (!(counter % 3) && i !== 0) {
              result.unshift(',');
            }
          }
          return result.join('');
        }
      }
    },
    mounted() {
      this.init();
      this.getData();
    },
    methods: {
      // 初始化
      init() {
        let option = {
          xAxis: {
            type: 'category',
            name: '日期',
            data: this.dateList
          },
          yAxis: {
            minInterval: 1,
            name: '会员数量',
            type: 'value'
          },
          tooltip: {
            trigger: 'axis',
            formatter: (params) => {
              return '日期：' + params[0].name + '<br/>会员数量：' + params[0].value + '人';
            },
            axisPointer: {
              type: 'shadow'
            }
          },
          series: [{
            data: this.numberList,
            type: 'line'
          }]
        };
        if (!this.chart) {
          this.chart = Echarts.init(document.getElementById('report'));
        }
        this.chart.setOption(option);
      },
      // 获取数据
      getData() {
        basic.getHomeData().then((res) => {
          if (res.data.code === 0) {
            const data = res.data.data;
            this.totalData[0].number = data.memberTotal;
            this.totalData[1].number = data.newMemberNumYesterday;
            this.totalData[2].number = data.totalRemainValue;
            this.dateList = [];
            this.numberList = [];
            let item = null;
            for (let i = 0; i < data.newMemberNumPassYear.length; i++) {
              item = data.newMemberNumPassYear[i];
              this.dateList.push(item.createMonth);
              this.numberList.push(item.num);
            }
            this.init();
          }
        });
      }
    },
  };
</script>
<style lang="scss" scoped>
ul {
  display: block;
  width: 100%;
  height: 150px;
  .data-item {
    display: block;
    float: left;
    margin-right: 50px;
    padding: 15px 15px 0 15px;
    width: 27%;
    height: 150px;
    background-color: #3aa2eb;
    box-sizing: border-box;
    color: #fff;
    text-align: center;
    .number {
      display: flex;
      height: 105px;
      font-size: 36px;
      align-items: center;
      justify-content: center;
      word-wrap: break-word;
      text-align: center;
    }
    .title {
      height: 30px;
      line-height: 30px;
      font-size: 18px;
    }
  }
}

.echart {
  padding: 10px;
  border: 1px solid rgb(229, 229, 229);
  border-radius: 2px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  box-sizing: border-box;
  background-color: rgb(255, 255, 255);
  header {
    display: flex;
    height: 30px;
    align-items: center;
    .blue-left {
      display: inline-block;
      width: 2px;
      height: 20px;
      background-image: linear-gradient(-180deg, #5ED5FF 0%, #3784FF 100%);
    }
    .title {
      font-size: 18px;
    }
  }
}

.report {
  display: block;
  margin-left:10px;
  width:900px;
  height:400px;
}
</style>
