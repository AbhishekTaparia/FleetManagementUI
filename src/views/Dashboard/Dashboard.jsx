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

//const argv = require('yargs').argv

class Dashboard extends Component {


  constructor(){
    super()
    this.state={
        //vara:argv[2],
        statcard1:0,
        statcard2:0,
        statcard3:0,
        statcard4:0,
        totalOrders:0,
        totalOrder2:0,
        totalDelivery:0,
        barChartData: {},
        pieChartData:{},
        lineChartData:{},
        bar2ChartData:{},
        bar3ChartData:{},
        barApiChartData:[],
        pieApiChartData:[],
        countOrders:[],
    }
  }

  componentDidMount(){
    console.log(URL)
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
        let num=0;
        console.log(client)
        for(var i=0;i<pieApiChartData.length;i++){
          client.push(pieApiChartData[i].value)
          num=num+pieApiChartData[i].value
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
          totalDelivery:num
        });
        
        console.log(this.state.barChartData)
      }) 
      axios.get(`${URL}/staticreports/orderperclient`)
      .then(response=>{
        const barApiChartData=response.data;
        let client=[];
        let orders=[];
        let num=0;
        for(var i=0;i<barApiChartData.length;i++){
          client.push(barApiChartData[i][0]);
          orders.push(barApiChartData[i][1]);
          num=num+barApiChartData[i][1]
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
          totalOrders:num
        });
        
        console.log(this.state.barChartData)
      })
      
      let data1=[];
      let num=0;
      for(var i=1;i<=12;i++){
        const start = "2017-"+i+"-01";
        console.log(start)
        const startdate= new Date(start);
       // 
        const end = "2017-"+i+"-30";
        console.log(end)
        const enddate= new Date(end);
        axios.get(`${URL}/orders/reports/monthcount/${start}/${end}`)
        .then(response=>{
          const countOrders=response.data;
          data1.push(countOrders)
          num=num+countOrders
          console.log(data1)
        })
      }
      //data1=[5,2,7,3,4,11,8,9,0,10,12,1]
      console.log(data1)
      //data1=[0,0,0,0,1,1,0,1,0,0,0,2]
      console.log("qwertyuiop")
      console.log(data1)
      setTimeout(()=>{this.setState({
        lineChartData: {
          labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"],
          datasets: [
            {
              label: "Orders",
              data: data1,
              backgroundColor: [
                "rgba(255,65,21,0.6)",
                "rgba(255,65,21,0.6)",
                "rgba(255,65,21,0.6)",
                "rgba(255,65,21,0.6)"
              ]
            }
          ]
        },
        totalOrders2:num
      });},5000)
      
      
      
        
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
                statsValue={this.state.statcard1}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                 bigIcon={<i className="pe-7s-cash text-success" />}
                statsText="&nbsp;&nbsp;&nbsp;&nbsp;Total Fleet Investment"
                statsValue= {"₹"+parseFloat(this.state.statcard2.toFixed(2))+" Cr"}
                statsIcon={<i className="fa fa-calendar-o" />}
                statsIconText="Last day"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-users text-danger" />}
                statsText="&nbsp;&nbsp;&nbsp;&nbsp;Total Drivers"
                statsValue= {this.state.statcard3+""}
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText="Updated Now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-way text-info" />}
                statsText="&nbsp;&nbsp;&nbsp;&nbsp;Total Distance Travelled"
                statsValue= {this.state.statcard4+" Kms"}
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
                title="Order Per Client"
                category={"Total Order : "+this.state.totalOrders}
                stats="Updated Now"
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
                title="Total Delivery"
                category={"Delivery in hand : "+this.state.totalDelivery}
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
                title="Orders per Month"
                category={"Total Orders in 2017 : "+this.state.totalOrders2}
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
                    <Line data={this.state.lineChartData} options={{
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
