import React, { useContext, useEffect, useState } from "react";

import { VictoryBar } from 'victory';
import { VictoryChart } from 'victory';
import { VictoryTheme, VictoryAxis, VictoryLabel } from 'victory';

export const BarChartProduct = ({barData}) => {

  return (
    <VictoryChart domainPadding={30} theme={VictoryTheme.material}>
      <VictoryLabel text="Quantity" x={10} y={150}  angle={-90} textAnchor="middle" backgroundStyle={{ fill: "BlanchedAlmond" }} backgroundPadding={8}/>
      <VictoryLabel text="Product" x={170} y={320} textAnchor="middle" backgroundStyle={{ fill: "LightGoldenrodYellow" }} backgroundPadding={8}/>
      <VictoryLabel text="Best Selling Products" x={170} y={30} textAnchor="middle"/>
      <VictoryAxis 
        style={{ 
          tickLabels: {angle :-90, fontSize: 10, padding: -70} 
        }}
      />
      <VictoryAxis 
        dependentAxis
        style={{ 
          tickLabels: {fontSize: 10, padding: 2} 
        }}
      />
      <VictoryBar
        style={{ data: { fill: "CornflowerBlue", fillOpacity: 1	 } }}
        alignment="end"
        barRatio={0.4}
        data={barData}
        // data accessor for x values
        x="x"
        // data accessor for y values
        y='y'
      />
    </VictoryChart>
  )
};

export const BarChartSale = ({barData}) => {

  return (
    <VictoryChart domainPadding={30} theme={VictoryTheme.material}>
      <VictoryLabel text="Total" x={10} y={150}  angle={-90} textAnchor="middle" backgroundStyle={{ fill: "BlanchedAlmond" }} backgroundPadding={8}/>
      <VictoryLabel text="Date" x={170} y={320} textAnchor="middle" backgroundStyle={{ fill: "LightGoldenrodYellow" }} backgroundPadding={8}/>
      <VictoryLabel text="Total Sale - Last 5 Days" x={170} y={30} textAnchor="middle"/>
      <VictoryAxis 
        style={{ 
          tickLabels: {angle :25, fontSize: 10, padding: 5} 
        }}
      />
      <VictoryAxis 
        dependentAxis
        tickFormat={(x) => (`$${x / 1000}k`)}
        style={{ 
          tickLabels: {fontSize: 10, padding: 0} 
        }}
      />
      <VictoryBar
        style={{ data: { fill: "ForestGreen", fillOpacity: 1	 } }}
        alignment="end"
        barRatio={0.4}
        data={barData}
        // data accessor for x values
        x="x"
        // data accessor for y values
        y='y'
      />
    </VictoryChart>
  )
};

export const BarChartColor = ({barData}) => {

  return (
    <VictoryChart domainPadding={30} theme={VictoryTheme.material}>
      <VictoryLabel text="Quantity" x={10} y={150}  angle={-90} textAnchor="middle" backgroundStyle={{ fill: "BlanchedAlmond" }} backgroundPadding={8}/>
      <VictoryLabel text="Color" x={170} y={330} textAnchor="middle" backgroundStyle={{ fill: "LightGoldenrodYellow" }} backgroundPadding={8}/>
      <VictoryLabel text="Most Popular Color" x={170} y={30} textAnchor="middle"/>
      <VictoryAxis 
        style={{ 
          tickLabels: {angle :0, fontSize: 10, padding: 0} 
        }}
      />
      <VictoryAxis 
        dependentAxis
        style={{ 
          tickLabels: {fontSize: 10, padding: 2} 
        }}
      />
      <VictoryBar
        style={{ data: { fill: "Orchid", fillOpacity: 1	 } }}
        alignment="end"
        barRatio={0.4}
        data={barData}
        // data accessor for x values
        x="x"
        // data accessor for y values
        y='y'
      />
    </VictoryChart>
  )
};

export const BarChartSize = ({barData}) => {

  return (
    <VictoryChart domainPadding={30} theme={VictoryTheme.material}>
      <VictoryLabel text="Quantity" x={10} y={150}  angle={-90} textAnchor="middle" backgroundStyle={{ fill: "BlanchedAlmond" }} backgroundPadding={8}/>
      <VictoryLabel text="Size" x={170} y={320} textAnchor="middle" backgroundStyle={{ fill: "LightGoldenrodYellow" }} backgroundPadding={8}/>
      <VictoryLabel text="Best Selling Sizes" x={170} y={30} textAnchor="middle"/>
      <VictoryAxis 
        style={{ 
          tickLabels: {fontSize: 10, padding: 0} 
        }}
      />
      <VictoryAxis 
        dependentAxis
        style={{ 
          tickLabels: {fontSize: 10, padding: 0} 
        }}
      />
      <VictoryBar
        style={{ data: { fill: "Salmon", fillOpacity: 1	 } }}
        alignment="end"
        barRatio={0.5}
        data={barData}
        // data accessor for x values
        x="x"
        // data accessor for y values
        y='y'
      />
    </VictoryChart>
  )
};