import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

const Tabs = React.createClass({
  render: function(){
    let tabDefinitions = this.props.tabDefinitions;
    let selectedTab = this.props.tabs.selectedTab;
    let tabIndex = 0;

    return (
      <div className='tabContainer'>
        {tabDefinitions.map(tab =>{
          tabIndex += 1;
          let isSelected = false;
          if(!selectedTab && tabIndex === 1){
            isSelected = true;
          }
          else{
            isSelected = tab.name === selectedTab;
          }

          return (
            <a key= {tab.name}
               className={'tab' + (isSelected ? ' selectedTab' : '')}
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
