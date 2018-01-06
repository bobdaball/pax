import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import { connect } from 'react-redux';
import * as d3 from 'd3';

@connect((store) => {
  return {
    height: store.analyzer.height,
    tone: store.analyzer.tone,
    upvoteAverages: store.user.upvoteAverages,
    width: store.analyzer.width,
  };
}) export default class BubbleChartUpvotes extends React.Component {
  drawChart() {
    const div = new ReactFauxDOM.Element('div'); // creates Virtual DOM that D3 manipulates
    const dataset = {};
    const tones = this.props.upvoteAverages;
    const allTonesList = Object.keys(tones).map((emo) => {
      return {
        Name: emo,
        Count: Math.round(tones[emo]),
      };
    });
    dataset.children = allTonesList;


    const color = d3.scaleOrdinal(d3.schemeCategory20);
    const yLength = this.props.height;
    const xLength = this.props.width;
    const bubble = d3.pack(dataset) // determines size taken up by Chart
      .size([xLength, yLength])
      .padding(1.5);

    const svg = d3.select(div)
      .append('svg')
      .attr('width', xLength)
      .attr('height', yLength)
      .attr('class', 'bubble');

    const nodes = d3.hierarchy(dataset) // size of individual bubbles
      .sum((d) => { return d.Count; });

    const node = svg.selectAll('.node')
      .data(bubble(nodes).descendants())
      .enter()
      .filter((d) => { return !d.children; })
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d) => {
        return `translate( ${d.x * 1.04}, ${d.y * 1.05} )`; // determines position of each node
      });

    node.append('title') // Creates info on hover over node
      .text((d) => {
        return `${d.data.Name}: ${d.data.Count}`;
      });

    node.append('circle')
      .attr('r', (d) => {
        return d.r * 1.1; // determines size of node
      })
      .style('fill', (d, i) => {
        return color(i); // chooses color of node from palette
      });

    node.append('text')
      .attr('dy', '.2em')
      .style('text-anchor', 'middle')
      .text((d) => {
        return d.data.Name.substring(0, d.r / 3);
      })
      .attr('font-size', (d) => { return d.r / 3.5; })
      .attr('fill', 'white');

    node.append('text')
      .attr('dy', '1.3em')
      .style('text-anchor', 'middle')
      .text((d) => {
        return d.data.Count;
      })
      .attr('font-size', (d) => { return d.r / 3.5; })
      .attr('fill', 'white');

    d3.select(this.frameElement)
      .style('height', `${xLength}px`);
    return div.toReact();
  }

  render() {
    return (
      <div className="container">
        {this.drawChart()}
      </div>
    );
  }
}
