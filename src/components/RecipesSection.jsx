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
                    <RecipesLink path="/recipes#householdRecipes" img={Household} text="Household Recipes" />
                </div>
                <div className="col-sm content-block-section">
                    <RecipesLink path="/recipes#cosmeticRecipes" img={Cosmetic} text="Cosmetic Recipes" />
                </div>
                <div className="col-sm content-block-section">
                    <RecipesLink path="/recipes#naturalRemedies" img={Remedies} text="Natural Remedies" />
                </div>
            </div>
        </div>
    );
};

export default RecipesSection;
