import React from 'react';

import RecipesLink from './RecipesLink';
import Household from '../assets/household.png';
import Cosmetic from '../assets/cosmetic.png';
import Remedies from '../assets/remedies.png';

const RecipesSection = () => {
    return (
        <div className="container">
            <div className="row content-block-row">
                <div className="col-sm content-block-section">
                    <RecipesLink path="/" img={Household} text="Household Recipes" />
                </div>
                <div className="col-sm content-block-section">
                    <RecipesLink path="/" img={Cosmetic} text="Cosmetic Recipes" />
                </div>
                <div className="col-sm content-block-section">
                    <RecipesLink path="/" img={Remedies} text="Natural Recipes" />
                </div>
            </div>
        </div>
    );
};

export default RecipesSection;
