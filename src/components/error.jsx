import React from 'react';

const Error = React.createClass({
    render: function(){
        return (
            <div className="centeringContainer errorPanel">
                <i className="fa fa-3x fa-exclamation-triangle"></i>
                <p>Error</p>
            </div>
        );
    }
});

export default Error;