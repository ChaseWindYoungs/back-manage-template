import{L as a,_ as d}from"./Chart-05b262ed.js";import{j as p,r as s,o as b,k as h,l as u,v as n,E as c}from"./index-f0783a82.js";const m={class:"w300 h300"},y={class:"w300 h300"},w=p({__name:"index",setup(_){const r=s(null),t={title:{text:"水位图",x:"center",y:"bottom",color:"#333",fontWeight:"normal",fontSize:"14px"},series:[{name:"水位图",type:"liquidFill",radius:"70%",data:[],label:{color:"#fff",insideColor:"#fff",fontSize:"040px",fontWeight:"bold"},color:[{type:"linear",x:0,y:1,x2:0,y2:0,colorStops:[{offset:1,color:["#6a7feb"]},{offset:0,color:["#557aa9"]}],global:!1}],outline:{show:!0,borderDistance:2,itemStyle:{borderColor:"#557aa9",borderWidth:3}},backgroundStyle:{color:"#212140",borderWidth:3}}]},i={backgroundColor:"#323a5e",tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},grid:{left:"2%",right:"4%",bottom:"14%",top:"16%",containLabel:!0},legend:{data:["1","2","3"],right:10,top:12,color:"#fff",itemWidth:12,itemHeight:10},xAxis:{type:"category",data:["2012","2013","2014","2015","2016","2017","2018","2019"],axisLine:{lineStyle:{color:"white"}},axisLabel:{fontFamily:"Microsoft YaHei"}},yAxis:{type:"value",max:"2000",axisLine:{show:!1,lineStyle:{color:"white"}},splitLine:{show:!0,lineStyle:{color:"rgba(255,255,255,0.3)"}},axisLabel:{}},series:[{name:"1",type:"bar",barWidth:"15%",stack:"Bar",itemStyle:{color:new a(0,0,0,1,[{offset:0,color:"#fccb05"},{offset:1,color:"#f5804d"}]),borderRadius:12},data:[400,400,300,300,300,400,400,400,300]},{name:"2",type:"bar",barWidth:"15%",stack:"Bar",itemStyle:{color:new a(0,0,0,1,[{offset:0,color:"#8bd46e"},{offset:1,color:"#09bcb7"}]),borderRadius:11},data:[400,500,500,500,500,400,400,500,500]},{name:"3",type:"bar",barWidth:"15%",stack:"Bar",itemStyle:{color:new a(0,0,0,1,[{offset:0,color:"#248ff7"},{offset:1,color:"#6851f1"}]),borderRadius:11},data:[400,600,700,700,1e3,400,400,600,700]}]},f=s();return b(()=>{setTimeout(()=>{let l=.6,o=[];for(let e=l*10;e>0;e--)o.push(e/10);t.series[0].data=o,r.value.myChart.setOption(t)},50)}),(l,o)=>{const e=d;return h(),u("div",null,[n("div",m,[c(e,{chartOption:t,id:"wave",ref_key:"waveChartRef",ref:r},null,512)]),n("div",y,[c(e,{chartOption:i,dataLen:i.series[0].data.length,loop:!0,mouseTrigger:!0,id:"bar",ref_key:"barChartRef",ref:f},null,8,["dataLen"])])])}}});export{w as default};