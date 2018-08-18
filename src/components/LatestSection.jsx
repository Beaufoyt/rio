import React from 'react';

import recipes from '../constants/recipes';

import PureComponent from './PureComponent';
import Recipe from './Recipe';

class LatestSection extends PureComponent {
    state = {
        recipes: [],
    };

    componentWillMount() {
        this.setState({
            recipes: recipes.sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            }),
        });
    }

    render() {
        const latestRecipe = this.state.recipes[0];

        return (
            <div id="latest" className="latest-section" >
                <hr />
                <Recipe recipe={latestRecipe} />
            </div>
        );
    }
}

export default LatestSection;
