import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';
@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class ChartComponent {
lineChart= new Chart({
  chart:{
    type:'line'
  },
  title:{
    text:'Patients'
  },
  credits:{
    enabled:false
  },
  series:[
    {
      name:'Patients admitted',
       }as any
  ]
})
pieChart = new Chart({
  chart:{
    type:'pie',
    plotShadow:false
  },
  credits:{
    enable:false,
  },
  plotOptions:{
    pie:{
      innerSize:'99%',
      borderWidth:10,
      borderColor:'',
      slicedOffset:10,
      dataLabels:{
        connectorWidth:0
      }
    }
  },
  title:{
verticalAlign:'middle',
floating:true,
text:'Diseases'
  },
  legend:{
    enable:false
  },
  series:[{
    type:'pie',
    data:[
      {name:'a',y:1,color:'#000'},
      {name:'b',y:2,color:'#fff'},
      {name:'c',y:3,color:'#563656'},
    ]
  }]
})
}
