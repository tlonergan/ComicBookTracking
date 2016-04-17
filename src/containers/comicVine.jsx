import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import Tabs from '../components/tabs';
import keys from '../core/keys';

import {getComicVineBooks} from '../actionCreators/comicVine';

const ComicVine = React.createClass({
	componentWillMount: function(){
		this.props.dispatch(getComicVineBooks());
	},
	handleClick: function(e, tabId){
		if(e)
			e.preventDefault();
	},
	render: function(){
		let tabs = [
			{name: 'added', display: keys.comicVineTabKeys.added, icon: 'fa-plus-square'}
		];

		let unattachedBooks = this.props.comicVine.comicVineBooks.unattachedBooks;
console.log(unattachedBooks)

		let noBookMessage = (<p>No Books</p>);

		if(this.props.isRetrieving || !unattachedBooks || unattachedBooks.length === 0){
			return (<p>Fetching Books</p>);
		}

		return(
			<div>
				<Tabs tabDefinitions={tabs} clickMethod={this.handleClick}/>
				<div className='tabPage'>
					{unattachedBooks.map(publisher =>{
						return (
							<div>
								<h3>{publisher.Key}</h3>
								{publisher.Value.map(book =>{
									return(
										<div className='item'>
											<h3>{book.volume.name} {book.issue_number}</h3>
											<div className='flex'>
												<div>
													<img src={book.image.thumb_url}/>
												</div>
												<div dangerouslySetInnerHTML={{__html: book.description}}>

												</div>
											</div>
										</div>
									)
								})}
							</div>
						);
					})}
				</div>
			</div>
		);
	}
});

function mapStateToProps(state){
	return{
		comicVine: state.get('comicVine').toJS()
	}
}

export default connect(mapStateToProps)(ComicVine);
