import React, { Component } from "react";
//import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "../../components/Card/Card.jsx";
import { StatsCard } from "../../components/StatsCard/StatsCard.jsx";
import { Tasks } from "../../components/Tasks/Tasks.jsx";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "../../variables/Variables.jsx";
import {Bar,Doughnut,Line} from 'react-chartjs-2';
import URL from '../../actions/index'
import axios from 'axios';
import road from "../../assets/img/road_PNG12.png"

class Dashboard extends Component {


  constructor(){
    super()
    this.state={
        statcard1:0,
        statcard2:0,
        statcard3:0,
        statcard4:0,
        barChartData: {},
        pieChartData:{},
        bar2ChartData:{},
        bar3ChartData:{},
        barApiChartData:[],
        pieApiChartData:[],
        countOrders:0,
    }
  }

  componentDidMount(){
    axios.get(`${URL}/fleets/total`)
      .then(response=>{
        const statcard1=response.data;
        this.setState({statcard1});
        console.log(response.data)
      })
      axios.get(`${URL}/fleets/totalprice`)
      .then(response=>{
        const statcard2=response.data/10000000;
        this.setState({statcard2});
        console.log(response.data)
      })
      axios.get(`${URL}/drivers/total`)
      .then(response=>{
        const statcard3=response.data;
        this.setState({statcard3});
        console.log(response.data)
      })
      axios.get(`${URL}/orders/kmstravelled`)
      .then(response=>{
        const statcard4=response.data;
        this.setState({statcard4});
        console.log(response.data)
        console.log(new Date().getDate())
      })
      axios.get(`${URL}/staticreports/delivery`)
      .then(response=>{
        const pieApiChartData=response.data;
        let client=[];
        //console.log(barApiChartData)
        console.log(client)
        for(var i=0;i<pieApiChartData.length;i++){
          client.push(pieApiChartData[i].value)
          
        }
        this.setState({
          pieChartData: {
            labels: ["Completed","Pending"],
            datasets: [
              {
                label: "Orders",
                data: client,
                backgroundColor: [
                  "rgba(65,255,21,0.6)",
                  "rgba(255,65,21,0.6)"
                ]
              }
            ]
          },
        });
        
        console.log(this.state.barChartData)
      }) 
      axios.get(`${URL}/staticreports/orderperclient`)
      .then(response=>{
        const barApiChartData=response.data;
        let client=[];
        let orders=[];
        for(var i=0;i<barApiChartData.length;i++){
          client.push(barApiChartData[i][0]);
          orders.push(barApiChartData[i][1]);
        }
        console.log(barApiChartData)
        console.log(client)
        console.log(orders)

        this.setState({
          barChartData: {
            labels: client,
            datasets: [
              {
                label: "Clients",
                data: orders,
                backgroundColor: [
                  "rgba(255,65,21,0.6)",
                  "rgba(255,65,21,0.6)",
                  "rgba(255,65,21,0.6)",
                  "rgba(255,65,21,0.6)"
                ]
              }
            ]
          },
        });
        
        console.log(this.state.barChartData)
      })
      // axios.get('http://localhost:3004/barChartData')
      // .then(response=>{
      //   const barChartData=response.data;
      //   this.setState({barChartData});
      //   console.log(this.state.barChartData)
      //   console.log(this.state.bar2ChartData)
      // })
      axios.get(`${URL}/bar2ChartData`)
      .then(response=>{
        const bar2ChartData=response.data;
        this.setState({bar2ChartData});
        //console.log(this.state.barChartData)
        console.log(this.state.bar2ChartData)
      })
      axios.get(`${URL}/bar3ChartData`)
      .then(response=>{
        const bar3ChartData=response.data;
        this.setState({bar3ChartData});
        //console.log(this.state.barChartData)
        //console.log(this.state.bar2ChartData)
      })
      const startdate= new Date("2017-09-01");
      const enddate= new Date("2017-09-30");
      axios.get(`http://10.20.34.49:8080/orders/reports/monthcount/${startdate}/${enddate}`)
      .then(response=>{
        const countOrders=response.data;
        this.setState({countOrders});
        //console.log(this.state.countOrders)
        //console.log(this.state.bar2ChartData)
        //console.log(startdate)
        //console.log(enddate)
      })
      
        
  }

  
  
  inc(){
    // let my=this;
    // //console.log(this.state.barApiChartData.length)
    // for(var i=0;i<my.state.barApiChartData.length;i++){
    //   my.state.barChartData.labels[i]=my.state.barApiChartData[i][0]
    //   my.state.barChartData.datasets[0].data[i]=my.state.barApiChartData[i][1]
    //   //console.log(this.state.barChartData.labels[i])
     
    // }
    // const barChartData=my.state.barChartData
    // //my.setState({barChartData:my.state.barChartData},)
    // //this.state.barChartData=barChartData
    // //setTimeout(this.setState({barChartData}),1000)
    // console.log(this.state.barChartData)
  }

  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }
  
  render() {
    
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-car text-warning" />}
                statsText="&nbsp;&nbsp;&nbsp;&nbsp;No. of Fleets"
                statsValue="12" //{/*this.state.statcard1*/}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                 bigIcon={<i className="pe-7s-cash text-success" />}
                statsText="&nbsp;&nbsp;&nbsp;&nbsp;Total Fleet Investment"
                statsValue= "₹ 12.52 Cr"  //{"₹"+parseFloat(this.state.statcard2.toFixed(2))+" Cr"}
                statsIcon={<i className="fa fa-calendar-o" />}
                statsIconText="Last day"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-users text-danger" />}
                statsText="&nbsp;&nbsp;&nbsp;&nbsp;Total Drivers"
                statsValue= "10" //{this.state.statcard3+""}
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText="Updated Now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-way text-info" />}
                statsText="&nbsp;&nbsp;&nbsp;&nbsp;Total Distance Travelled"
                statsValue= "1551 Kms" //{this.state.statcard4+" Kms"}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="In the last hour"
              />
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Users Behavior"
                category="24 Hours performance"
                stats="Updated 3 minutes ago"
                content={
                  <div className="ct-chart">
                    {/* <ChartistGraph
                      data={dataSales}
                      type="Line"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    /> */
                    
                    <Bar data={this.state.barChartData} options={{
                      
                      title:{
                        display:false,
                        text:'Bar graph',
                        fontSize:25
                      },
                      legend:{
                        display:true,
                        position:'top'
                      },
                      maintainAspectRatio: false
                    }}/>
                    }
                  </div>
                }
                // legend={
                //   <div className="legend">{this.createLegend(legendSales)}</div>
                // }
              />
            </Col>
            <Col md={4}>
              <Card
                statsIcon="fa fa-clock-o"
                title="Email Statistics"
                category="Last Campaign Performance"
                stats="Campaign sent 2 days ago"
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >
                  <Doughnut data={this.state.pieChartData} options={{
                      title:{
                        display:false,
                        text:'Bar graph',
                        fontSize:25
                      },
                      legend:{
                        display:true,
                        position:'top'
                      },
                      maintainAspectRatio: false
                    }}/>

                    {/* <ChartistGraph data={dataPie} type="Pie" /> */}
                  </div>
                }
                
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Card
                id="chartActivity"
                title="2014 Sales"
                category="All products including Taxes"
                stats="Data information certified"
                statsIcon="fa fa-check"
                content={
                  <div className="ct-chart">
                    {/* <ChartistGraph
                      data={dataBar}
                      type="Bar"
                      options={optionsBar}
                      responsiveOptions={responsiveBar}
                    /> */}
                    <Line data={this.state.bar3ChartData} options={{
                      title:{
                        display:false,
                        text:'Bar graph',
                        fontSize:25
                      },
                      legend:{
                        display:true,
                        position:'top'
                      }
                    }}/>
                  </div>
                }
                
              />
            </Col>

            <Col md={6}>
              <Card
                title="Tasks"
                category="Backend development"
                stats="Updated now"
                statsIcon="fa fa-history"
                content={
                  <div className="table-full-width">
                    <table className="table">
                      <Tasks />
                    </table>
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
