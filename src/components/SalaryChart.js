import React from 'react';
import { Chart } from 'react-google-charts';
import Moment from 'react-moment';
import m from 'moment';

import Data from '../dataSets/salaryFinale.json';

class SalaryChart extends React.Component {
  state = {
    chartData:  {},
    arrayLength: Object.keys(Data).length,
    generation: 0,
    currentDate: ''
  }

  componentDidMount() {
    this.generateData();
  };

  generateData = () => {
    let arrValue = [];
    let arrKeys = [];

    Object.keys(Data).forEach(function (key) {
      arrValue.push(Data[key].sort())
      arrKeys = Object.keys(Data)
    }); 

    setInterval(() => {
      if (this.state.generation < this.state.arrayLength) {
        let tabLine = arrValue[this.state.generation];
        tabLine.unshift(['Maakond', 'Palk',  
          { 
            sourceColumn: 3 ,
            role: 'annotation',
            type: 'string',
          },
          {
            role: 'style'
          }
        ]);
        
        var day = m.unix(arrKeys[this.state.generation]).utc();

        this.setState({ generation: this.state.generation + 1, chartData: tabLine, currentDate: day })
      }
    }, 300)
  };

  render() {
    return (
      <div class="c-content c-content--wide">
        <h2 class="c-content__title c-content__title--sm">Mitu korda erineb keskmine palk Tallinnas ja Ida-Virumaal?</h2>
        <div class="c-chart">
        <Moment format="YYYY-MM" style={{ 
            fontSize: '5rem', 
            position: 'absolute', 
            zIndex: '99',
            top: '26rem',
            right: '5rem' 
             }}>
          {this.state.currentDate}
        </Moment>
        <Chart
          width={'85%'}
          height={'500px'}
          chartType="BarChart"
          loader={<div>Loading Chart</div>}
          data={this.state.chartData}
          options={{
            chartArea: {
              width: '70%',
              height: '80%',
            },
            colors: ['#8e0152', '#276419'],
            pointSize: 1,
            animation: {
              duration: 300,
              easing: 'linear',
              startup: true,
            },
            vAxis: {
              //title: 'City',
            },
            hAxis: {
              viewWindow: {
                max: 1300,
                min: -10,
              },
            },
            legend: { position: 'none' },
            enableInteractivity: false,
            bars: 'horizontal'
          }}
          rootProps={{ 'data-testid': '1' }}
        />
        </div></div>
    )
  }
};

export default SalaryChart;