import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvasjs.stock.react';
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;
var updateInterval = 1000;
var dps = []
class ChartWithZoom extends Component {
  constructor(props) {
    super(props);
    this.state = { dataPoints: [], isLoaded: false, livePrice : 0};
    //this.updateChart = this.updateChart.bind(this);
  }
  componentDidMount() {
      this.callBackendAPI()
      .then(res => this.setState({ dataPoints: res.priceandtime, isLoaded: true, livePrice : res.realTime}))
      .catch(err => console.log(err));
      setInterval(this.updateChart, updateInterval);
  }
  updateChart= async () => {
    const response = await fetch('/getPriceBTC');
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message) 
    }

    var length = this.chart.options.charts[0].data[0].dataPoints.length;
          

    if(new Date().getTime()>this.chart.options.charts[0].data[0].dataPoints[length-1].x.getTime()+60*1000)
      this.chart.options.charts[0].data[0].dataPoints.push({x:new Date(),y:body})
    this.chart.options.charts[0].data[0].dataPoints[length-1].y=body
    this.chart.options.subtitles[0].text=body
		this.chart.render()
	}
  callBackendAPI = async () => {
    const response = await fetch('/historicalDataBTC');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    for (var i = 0; i < body.length; i++) {
      dps.push({
        x: new Date(body[i].time),
        y: Number(body[i].close)
      });
    }
    return {priceandtime:dps,realTime:dps[dps.length-1].y}
  }
  
 
  render() {
    const options = {
      title:{
        text:"BTCUSDT"
      },
      theme: "light2",
      subtitles: [{
        text: this.state.livePrice,
        fontColor: 'red'         
      }],
      charts: [{
        axisX: {
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            valueFormatString: "MMM DD YYYY"
          }
        },
        axisY: {
          title: "Bitcoin Price",
          suffix: "$",
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            valueFormatString: "$#,###.##"
          }
        },
        toolTip: {
          shared: true
        },
        data: [{
          name: "Price (in USDT)",
          type: "line",
          color: "#3576a8",
          yValueFormatString: "$#,###.##",
          xValueFormatString: "MMM DD YYYY",
          dataPoints : this.state.dataPoints
        }]
      }],
      navigator: {
        slider: {
          minimum: new Date(new Date().getTime() - (60 * 1000* 10))
        },
    }
  }
    const containerProps = {
      width: "100%",
      height: "450px",
      margin: "auto"
    };
    return (
      <div> 
        <div>
          {
            this.state.isLoaded && 
            <CanvasJSStockChart containerProps={containerProps} options = {options}
               onRef = {ref => this.chart = ref} 
            />
          }
        </div>
      </div>
    );
  }
}
	export default ChartWithZoom;    