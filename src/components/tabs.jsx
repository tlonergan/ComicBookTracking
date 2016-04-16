import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

const Tabs = React.createClass({
  render: function(){
    let tabDefinitions = this.props.tabDefinitions;
    let selectedTab = this.props.tabs.selectedTab;

    return (
      <div className='tabContainer'>
        {tabDefinitions.map(tab =>{
          return (
            <a key= {tab.name}
               className={'tab' + (tab.name === selectedTab ? ' selectedTab' : '')}
               onClick={(e) => {this.props.clickMethod(e, tab.name);}}>
               <i className={'fa ' + tab.icon}></i><span>{tab.display}</span>
            </a>
          );
        })
      }
    </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    tabs: state.get('tab').toJS()
  };
}

export default connect(mapStateToProps)(Tabs);
