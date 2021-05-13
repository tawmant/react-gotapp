import React, {Component} from 'react';
import './app.css';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';
import {CharactersPage, BooksPage, HousesPage, BooksItem} from '../pages';

import {BrowserRouter as Router, Route} from 'react-router-dom';

export default class App extends Component {

    gotService = new gotService();

    state = {
        showRandomChar: true,
        error: false
    }

    componentDidCatch() {
        this.setState({
           error: true
        });
    }

    toggleRandomChar = () => {
        this.setState(({showRandomChar}) => {
            return {
                showRandomChar: !showRandomChar
            };
        });
    }

    render() {

        const { showRandomChar } = this.state;

        const char = showRandomChar ? <RandomChar /> : null;
        const btnText = showRandomChar ? 'Hide random character' : 'Show random character';

        if (this.state.error) {
            return <ErrorMessage/>;
        }

        return (
            <Router>
                <div className='app'>
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {char}
                                <button onClick={this.toggleRandomChar} className='btn-hide'>{btnText}</button>
                            </Col>
                        </Row>
                        <Route path='/' exact component={CharactersPage}/>
                        <Route path='/houses' component={HousesPage}/>
                        <Route path='/books' exact component={BooksPage}/>
                        <Route path='/books/:id' render={
                            (routeItem) => {
                                const {id} = routeItem.match.params;

                                return <BooksItem bookId={id} />;
                            }
                        }/>
                    </Container>
                </div>
            </Router>
        );
    }





}