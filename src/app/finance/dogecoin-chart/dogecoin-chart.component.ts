import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { RepositoryService } from 'src/app/shared/repository.service';
import { map, tap } from 'rxjs/operators';
import { DogeCoinQuote } from 'src/app/_interface/dogecoin-quote.model';
import { faBluetooth } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-dogecoin-chart',
  templateUrl: './dogecoin-chart.component.html',
  styleUrls: ['./dogecoin-chart.component.css']
})
export class DogecoinChartComponent implements OnInit {
  options: any;
  updateOptions: any;

  private oneDay = 24 * 3600 * 1000;
  private now: Date;
  private value: number ;
  private value2: number ;
  private askingPrices: any[];
  private bidPrices: any[];
  private markPrices: any[];
  private dates: any[];
  private timer: any;
  private count: number;

  constructor(private repoService: RepositoryService) { }

  ngOnInit(): void {
   
    // generate some random testing data:
    this.askingPrices = [];
    this.bidPrices = [];
    this.markPrices = [];
    this.dates = [];
    this.count = 0;

    // initialize chart options:
    this.options = {
      title: {
        text: 'Dynamic Doge Prices + Time Axis'
      },
      tooltip: {
        trigger:'axis',
        axisPointer:{
          type:'shadow'
        }
      },
      toolbox: {
        show: true,
        feature: {
          dataZoom: {
              yAxisIndex: 'none'
          },
          dataView: {readOnly: false},
          magicType: {type: ['line', 'bar']},
          restore: {},
          saveAsImage: {}
        }
      },
      legend: {
        data:['Asking Prices', 'Bid Prices', 'Mark Prices']
      },
      grid:{
        show:true,
        top: 80,
        bottom: 100
      },
    xAxis: {
        type: 'category',
        boundaryGap:false,
        // splitLine: {
        //   show: false
        // },
        name:"date",
        data: this.dates,
        axisLabel:{
          interval:0,
          rotate:"45",
          // formatter:function(params){
          //   console.log(params);
          // }
        },
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        scale:true,
        splitLine: {
          show: false
        }
      },
      dataZoom: [{
        type: 'inside',
        xAxisIndex: 0,
        minSpan: 5
    }, {
        type: 'slider',
        xAxisIndex: 0,
        minSpan: 5,
        bottom: 50
    }],
      series: [{
        name: 'Asking Prices',
        type: 'line',
        showSymbol: true,
        data: this.askingPrices,
        areaStyle:{},
        // label:{
        //   show:true,
        //   position:'top',
        //   rotate:"45",
        // },
        markPoint:{
          data:[
            {type:'max', name: 'high price'},
            {type:'min', name: 'low price'},
          ]
        },
        markLine: {
          data: [{
              symbol: 'diamond',
            symbolSize: 30,
            name: 'average line',
            type: 'average'
          },{
              symbol: 'circle',
            symbolSize: 30,
            name: 'max line',
            type: 'max'
          }]
        },
      },
      {
        name: 'Mark Prices',
        type: 'line',
        showSymbol: true,
        data: this.markPrices,
        areaStyle:{
          color:'rgb(204,255,204)',
          opacity:1,
        },
        // label:{
        //   show:true,
        //   position:'top',
        //   rotate:"45",
        // },
        markPoint:{
          data:[
            {type:'max', name: 'high price'},
            {type:'min', name: 'low price'},
          ]
        },
        markLine: {
          data: [{
              symbol: 'diamond',
            symbolSize: 30,
            name: 'average line',
            type: 'average'
          }]
        }
      },      
      {
        name: 'Bid Prices',
        type: 'line',
        showSymbol: true,
        data: this.bidPrices,
        areaStyle:{
          color:'rgb(255,255,204)',
          opacity:1,
        },
        // label:{
        //   show:true,
        //   position:'top',
        //   rotate:"45",
        // },
        markLine: {
          silent: true,
          lineStyle: {
            normal: {
            type: 'solid',
            },
          },
          data: [{
              symbol: 'diamond',
            symbolSize: 30,
            name: 'average line',
            type: 'average'
          }],
        },
        markPoint:{
          data:[
            {type:'max', name: 'high price'},
            {type:'min', name: 'low price'},
          ]
        },
      }]
    };

    // Mock dynamic data:
    this.timer = setInterval(() => {
      this.repoService.getData('doge',null)
      .pipe(
        map(response => response),
        //tap(users => console.log("users array", users))    // users array [Object, Object, Object]
      )
      .subscribe((quote:DogeCoinQuote) => {
        var day = 60*60*4;
        if (this.dates.length > day)
          this.dates = [];
        
        if (this.count % 60 == 0)
        {
          console.log(quote.timeAt);
          this.dates.push(quote.timeAt);
        }
        else
          this.dates.push("");
        this.count = this.count+1;
        if (this.askingPrices.length > day)
          this.askingPrices = [];
        this.askingPrices.push({name:quote.timeAt, value:quote.askPrice});
        if (this.bidPrices.length > day)
          this.bidPrices=[];
        this.bidPrices.push({name:quote.timeAt, value:quote.bidPrice});
        if (this.markPrices.length > day)
          this.markPrices = [];
        this.markPrices.push({name:quote.timeAt, value:quote.markPrice});

        // update series data:
        this.updateOptions = {
          xAxis:{
            data: this.dates
          },
          series: [{
            data: this.askingPrices,
            markLine: {
              silent: true,
              precision:6,
              lineStyle: {
                normal: {
                type: 'dashed',
                },
              },
              data: [{
                symbol: 'diamond',
                //symbolSize: 30,
                name: 'average line',
                type: 'average',
                valueIndex:1,
              },
              {
                name:'current value',
                yAxis:quote.askPrice,
                xAxis:0,
                label:{
                  backgroundColor:'rgb(28,16,152)',
                  color:'rgb(255,255,255)',
                  padding:4,
                }
              }
            ],
            },
          },{
            data: this.markPrices,
            markLine: {
              silent: true,
              precision:6,
              lineStyle: {
                normal: {
                type: 'dashed',
                },
              },
              data: [{
                symbol: 'diamond',
                //symbolSize: 30,
                name: 'average line',
                type: 'average',
                valueIndex:1,
              },{
                name:'current value',
                yAxis:quote.markPrice,
                xAxis:0,
                label:{
                  backgroundColor:'rgb(0,64,0)',
                  color:'rgb(255,255,255)',
                  padding:4,
                }
              }],
            },
          },{
            data: this.bidPrices,
            markLine: {
              silent: true,
              precision:6,
              lineStyle: {
                normal: {
                type: 'dashed',
                },
              },
              data: [{
                symbol: 'diamond',
                //symbolSize: 30,
                name: 'average line',
                type: 'average',
                valueIndex:1,
              },{
                name:'current value',
                yAxis:quote.bidPrice,
                xAxis:0,
                label:{
                  backgroundColor:'rgb(82,82,0)',
                  color:'rgb(255,255,255)',
                  padding:4,
                }
              }],
            },
          }]
        };
        this.options.xAxis.categories = this.dates;
      });
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }
}
