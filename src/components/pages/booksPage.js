import React, {Component} from 'react';
import ItemList from '../itemList';
import gotService from '../../services/gotService';
import ErrorMessage from '../errorMessage';

class BooksPage extends  Component {

    gotService = new gotService();

    state = {
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        });
    }

    render() {

        const {error} = this.state;

        if (error) {
            return <ErrorMessage/>;
        }

        return (
            <ItemList
                onItemSelected={(itemId) => {
                    this.props.history.push(`/books/${itemId}`);
                }}
                getData={this.gotService.getAllBooks}
                renderItem={({name}) => name}
            />
        );
    }
}

export default BooksPage;