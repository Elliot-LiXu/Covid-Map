import React from 'react';
import ReactDOM from 'react-dom';
import jsonData from './feiyan.json'
import SearchCom from './searchCom.js'
// import echarts from 'echarts'
import './mapStyle.css'


let provinceObj = {

};

let provinces_data = jsonData.data.areaTree[2].children;
// console.log(provinces_data[0]);
provinces_data.forEach((item, i) => {
  if (provinceObj[item.name]===undefined) {
    provinceObj[item.name] = {
      confirm: 0,
      suspect: 0,
      heal: 0,
      dead: 0
    }
  }
  item.confirm = item.confirm ? item.confirm: 0;
  item.suspect = item.suspect ? item.suspect: 0;
  item.heal = item.heal ? item.heal: 0;
  item.dead = item.dead ? item.dead: 0;

  provinceObj[item.name] = {
    confirm: provinceObj[item.name].confirm + item.total.confirm,
    suspect: provinceObj[item.name].suspect + item.total.suspect,
    heal: provinceObj[item.name].heal + item.total.heal,
    dead: provinceObj[item.name].dead + item.total.dead
  }
});
// console.log(provinceObj);

let provinceList = [];
for (const key in provinceObj) {
  provinceObj[key].province = key;
  provinceList.push(provinceObj[key]);
}
// console.log(provinceList);

// sort
provinceList.sort((a, b)=>{
  if (a.confirm < b.confirm) {
    return 1;
  } else {
    return -1;
  }
});
// console.log(provinceList);

class CovidChinaMap extends React.Component {
  // constructor(props) {
  //   super(props)
  // }
  render() {
    return (
      <div>
        <div id="title">
        <h1>中国新冠疫情地图</h1>
        </div>
        <div id="map"></div>
        <SearchCom provinceObj={provinceObj}></SearchCom>
        <div>
          <h1>中国病例</h1>
          <ul>
            <li>
              <span>地区</span>
              <span>确诊</span>
              <span>疑似</span>
              <span>治愈</span>
              <span>死亡</span>
            </li>
            {
              this.props.list.map((item, index) => {
                return (
                  <li key={index}>
                    <span>{item.province}</span>
                    <span>{item.confirm}</span>
                    <span>{item.suspect}</span>
                    <span>{item.heal}</span>
                    <span>{item.dead}</span>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
      

      
    )
  }
  componentDidMount() {
    var dataList=[
      {name:"南海诸岛",value:0},
      {name: '北京', value: randomValue()},
      {name: '天津', value: randomValue()},
      {name: '上海', value: randomValue()},
      {name: '重庆', value: randomValue()},
      {name: '河北', value: randomValue()},
      {name: '河南', value: randomValue()},
      {name: '云南', value: randomValue()},
      {name: '辽宁', value: randomValue()},
      {name: '黑龙江', value: randomValue()},
      {name: '湖南', value: randomValue()},
      {name: '安徽', value: randomValue()},
      {name: '山东', value: randomValue()},
      {name: '新疆', value: randomValue()},
      {name: '江苏', value: randomValue()},
      {name: '浙江', value: randomValue()},
      {name: '江西', value: randomValue()},
      {name: '湖北', value: randomValue()},
      {name: '广西', value: randomValue()},
      {name: '甘肃', value: randomValue()},
      {name: '山西', value: randomValue()},
      {name: '内蒙古', value: randomValue()},
      {name: '陕西', value: randomValue()},
      {name: '吉林', value: randomValue()},
      {name: '福建', value: randomValue()},
      {name: '贵州', value: randomValue()},
      {name: '广东', value: randomValue()},
      {name: '青海', value: randomValue()},
      {name: '西藏', value: randomValue()},
      {name: '四川', value: randomValue()},
      {name: '宁夏', value: randomValue()},
      {name: '海南', value: randomValue()},
      {name: '台湾', value: randomValue()},
      {name: '香港', value: randomValue()},
      {name: '澳门', value: randomValue()}
  ]
  // console.log(dataList)

  dataList = dataList.map((item, index)=>{
    if (provinceObj[item.name]) {
      item.value = provinceObj[item.name].confirm;
    } else {
      item.value = 0;
    }
    return item 
  });
  // console.log(dataList)

  var myChart = window.echarts.init(document.getElementById('map'));
  function randomValue() {
      return Math.round(Math.random()*1000);
  }
  var option = {
      tooltip: {
              formatter:function(params,ticket, callback){
                  return params.seriesName+'<br />'+params.name+'：'+params.value
              }//数据格式化
          },
      visualMap: {
          min: 0,
          max: 1500,
          left: 'left',
          top: 'bottom',
          text: ['高','低'],//取值范围的文字
          inRange: {
              color: ['#F5DEB3', '#800000']//取值范围的颜色
          },
          show:true//图注
      },
      geo: {
          map: 'china',
          roam: false,//不开启缩放和平移
          zoom:1.23,//视角缩放比例
          label: {
              normal: {
                  show: true,
                  fontSize:'10',
                  color: 'rgba(0,0,0,0.7)'
              }
          },
          itemStyle: {
              normal:{
                  borderColor: 'rgba(0, 0, 0, 0.2)'
              },
              emphasis:{
                  areaColor: '#FF00FF',//鼠标选择区域颜色
                  shadowOffsetX: 0,
                  shadowOffsetY: 0,
                  shadowBlur: 20,
                  borderWidth: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
          }
      },
      series : [
          {
              name: '确诊人数',
              type: 'map',
              geoIndex: 0,
              data:dataList
          }
      ]
  };
  myChart.setOption(option);
  myChart.on('click', function (params) {
    alert(params.name + "的确诊人数：" + params.value);
  });
  }
}





ReactDOM.render(
  <CovidChinaMap list={provinceList}/>,
  document.getElementById('root')
);

