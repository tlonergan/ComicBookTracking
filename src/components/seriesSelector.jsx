import React, { PropTypes } from 'react'
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import {getAllUnattachedSeries, getSeries} from '../actionCreators/series';

const SeriesSelector = React.createClass({
  componentDidMount: function() {
    this.props.dispatch(getAllUnattachedSeries());
  },
  handleSeriesSelected: function(e){
    console.log('selector handler')
    console.log(e.target.value)
    this.props.dispatch(getSeries(e.target.value));
  },
  render: function(){
    let series = this.props.series;
    return (
      <div>
        <select onChange={this.handleSeriesSelected}>
          <option></option>
          {series.map(s => {
            return (
              <option key={s.Id} value={s.Id}>{s.Name}</option>
            )
          })}
        </select>
        <button onClick={() => {this.props.onSeriesSelect()}}>Select Series</button>
      </div>
    )
  }
});

export default connect()(SeriesSelector);
