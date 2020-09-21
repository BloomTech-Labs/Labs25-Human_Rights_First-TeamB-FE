import React from 'react';
import { Timeline, TimelineItem } from 'vertical-timeline-component-for-react';
import Moment from 'react-moment';
import axios from 'axios';
import { useState, useEffect } from 'react';

const last = function last(array, n) {
  if (array == null) return void 0;
  if (n == null) return array[array.length - 1];
  return array.slice(Math.max(array.length - n, 0));
};

export default function PbTimeline() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function getData() {
      await axios
        .get(`https://api.846policebrutality.com/api/incidents`)
        .then(res => {
          setResults(last(res.data.data, 26));
        })
        .catch(err => {
          console.log(err);
        });
    }

    getData();
  }, []);

  console.log(results);

  return (
    <>
      <div className="tl-header">
        <h2>Timeline of Recent Events</h2>
      </div>
      <Timeline lineColor={'#ddd'} className="pbTimeline">
        <TimelineItem
          key="001"
          dateText="January - March"
          style={{ color: '#bc541e' }}
        >
          <h3>Excessive Use of Force Incidents | January 2020 - March 2020</h3>
          <p>
            Est incididunt sint eu minim dolore mollit velit velit commodo ex
            nulla exercitation. Veniam velit adipisicing anim excepteur nostrud
            magna nostrud aliqua dolor. Sunt aute est duis ut nulla officia
            irure reprehenderit laborum fugiat dolore in elit. Adipisicing do
            qui duis Lorem est.
          </p>
          <p>
            Est incididunt sint eu minim dolore mollit velit velit commodo ex
            nulla exercitation. Veniam velit adipisicing anim excepteur nostrud
            magna nostrud aliqua dolor. Sunt aute est duis ut nulla officia
            irure reprehenderit laborum fugiat dolore in elit. Adipisicing do
            qui duis Lorem est.
          </p>
        </TimelineItem>
        <TimelineItem
          key="002"
          dateText="April – July"
          style={{ color: '#bc541e' }}
        >
          <h3>Excessive Use of Force Incidents | April 2020 - July 2020</h3>
          <p>
            Est incididunt sint eu minim dolore mollit velit velit commodo ex
            nulla exercitation. Veniam velit adipisicing anim excepteur nostrud
            magna nostrud aliqua dolor. Sunt aute est duis ut nulla officia
            irure reprehenderit laborum fugiat dolore in elit. Adipisicing do
            qui duis Lorem est.
          </p>
          <p>
            Est incididunt sint eu minim dolore mollit velit velit commodo ex
            nulla exercitation. Veniam velit adipisicing anim excepteur nostrud
            magna nostrud aliqua dolor. Sunt aute est duis ut nulla officia
            irure reprehenderit laborum fugiat dolore in elit. Adipisicing do
            qui duis Lorem est.
          </p>
        </TimelineItem>
        <TimelineItem
          key="003"
          dateText="August – September"
          style={{ color: '#bc541e' }}
        >
          <h3>
            Excessive Use of Force Incidents | August 2020 - September 2020
          </h3>
          <p>
            Est incididunt sint eu minim dolore mollit velit velit commodo ex
            nulla exercitation. Veniam velit adipisicing anim excepteur nostrud
            magna nostrud aliqua dolor. Sunt aute est duis ut nulla officia
            irure reprehenderit laborum fugiat dolore in elit. Adipisicing do
            qui duis Lorem est.
          </p>
          <p>
            Est incididunt sint eu minim dolore mollit velit velit commodo ex
            nulla exercitation. Veniam velit adipisicing anim excepteur nostrud
            magna nostrud aliqua dolor. Sunt aute est duis ut nulla officia
            irure reprehenderit laborum fugiat dolore in elit. Adipisicing do
            qui duis Lorem est.
          </p>
        </TimelineItem>
        <TimelineItem
          key="004"
          dateText="October – December"
          style={{ color: '#bc541e' }}
        >
          <h3>
            Excessive Use of Force Incidents | October 2020 - December 2020
          </h3>
          <p>
            Est incididunt sint eu minim dolore mollit velit velit commodo ex
            nulla exercitation. Veniam velit adipisicing anim excepteur nostrud
            magna nostrud aliqua dolor. Sunt aute est duis ut nulla officia
            irure reprehenderit laborum fugiat dolore in elit. Adipisicing do
            qui duis Lorem est.
          </p>
          <p>
            Est incididunt sint eu minim dolore mollit velit velit commodo ex
            nulla exercitation. Veniam velit adipisicing anim excepteur nostrud
            magna nostrud aliqua dolor. Sunt aute est duis ut nulla officia
            irure reprehenderit laborum fugiat dolore in elit. Adipisicing do
            qui duis Lorem est.
          </p>
        </TimelineItem>
      </Timeline>
    </>
  );
}