import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import BookSearch from '../components/bookSearch';

const Book = React.createClass({
  render: function(){
    return(
      <div>
        <BookSearch></BookSearch>
      </div>
    );
  }
});

export default connect()(Book);
