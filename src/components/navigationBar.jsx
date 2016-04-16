import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {toJS} from 'immutable';

const NavigationBar = React.createClass({
	componentWillMount: function(){
		this.setState({menuShown: false});
	},
	clickMenu: function(){
		this.setState({menuShown: !this.state.menuShown});
	},
	render: function(){
		return (
			<div className='navigationBar'>
				<div className='flex centeringContainer'>
					<div>
						{this.props.pageTitle}
					</div>
					<button className='menuButton' onClick={this.clickMenu}>
						<i className='fa fa-bars'></i>
					</button>
				</div>
				<div className={this.state.menuShown ? '' : 'collapse'}>
					<div className='menuItem'>
						<Link to='/wantList' onClick={this.clickMenu}>
							<i className='fa fa-shopping-cart'></i> Want Lists
					   </Link>
				   </div>
					<div className='menuItem'>
						<Link to='/search' onClick={this.clickMenu}>
							<i className='fa fa-search'></i> Search
					   </Link>
				   </div>
					<div className='menuItem'>
						<Link to='/comicVine' onClick={this.clickMenu}>
							<i className='fa fa-bolt'></i> Comic Vine
					   </Link>
				   </div>
				</div>
			</div>
		);
	}
});

function mapStateToProps(state) {
  return {
  	pageTitle: 'Comic Book Inventory'
  };
}

export default connect(mapStateToProps)(NavigationBar);
