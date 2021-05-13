import React, {Component} from 'react';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../ItemDetails';
import gotService from '../../services/gotService';
import ErrorMessage from '../errorMessage';
import RowBlock from '../rowBlock';

export default class CharactersPage extends  Component {

    gotService = new gotService();

    state = {
        selectedChar: null,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedChar: id
        });
    }

    componentDidCatch() {
        this.setState({
            error: true
        });
    }

    render() {

        const {selectedChar, error} = this.state;

        if (error) {
            return <ErrorMessage/>;
        }

        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllCharacters}
                renderItem={({name, gender}) => `${name} (${gender})`}
            />
        );

        const charDetails = (
            <ItemDetails
                itemId={selectedChar}
                getItem={this.gotService.getCharacter}
            >
                <Field field='gender' label='Gender'/>
                <Field field='born' label='Born'/>
                <Field field='died' label='Died'/>
                <Field field='culture' label='Culture'/>
            </ItemDetails>
        );

        return (
            <RowBlock left={itemList} right={charDetails}/>
        );
    }
}

