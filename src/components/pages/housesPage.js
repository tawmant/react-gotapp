import React, {Component} from 'react';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../ItemDetails';
import gotService from '../../services/gotService';
import ErrorMessage from '../errorMessage';
import RowBlock from '../rowBlock';

export default class HousesPage extends  Component {

    gotService = new gotService();

    state = {
        selectedHouse: null,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedHouse: id,
            error: false
        });
    }

    componentDidCatch() {
        this.setState({
            error: true
        });
    }

    render() {

        const {selectedHouse, error} = this.state;

        if (error) {
            return <ErrorMessage/>;
        }

        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllHouses}
                renderItem={({name}) => name}
            />
        );


        const housesDetails = (
            <ItemDetails
                itemId={selectedHouse}
                getItem={this.gotService.getHouse}
            >
                <Field field='region' label='Region'/>
                <Field field='words' label='Words'/>
                <Field field='titles' label='Titles'/>
                <Field field='ancestralWeapons' label='Ancestral Weapons'/>
            </ItemDetails>
        );

        return (
            <RowBlock left={itemList} right={housesDetails}/>
        );
    }
}

