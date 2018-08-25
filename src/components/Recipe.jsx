import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable react/forbid-prop-types */

const Recipe = (props) => {
    const mapTags = () => {
        return props.recipe.tags.map((tag, index) => {
            return (
                <a key={tag.text} href={tag.link}>
                    {tag.text}{index !== props.recipe.tags.length - 1 ? ', ' : ''}
                </a>
            );
        });
    };

    const mapIngredients = () => {
        return (
            <ul className="ingredients-list margin-top margin-bottom">
                {props.recipe.ingredients.map((ingredient, index) => {
                    return (
                        <li key={`${ingredient}-${index}`}>
                            <p>
                                {ingredient}
                            </p>
                        </li>
                    );
                })}
            </ul>
        );
    };

    const mapSteps = () => {
        return (
            <ul className="steps-list margin-top margin-bottom">
                {props.recipe.steps.map((step, index) => {
                    return (
                        <li key={`${step}-${index}`}>
                            <p>
                                {step}
                            </p>
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <div className="recipe">
            <h4 className="margin-bottom-double">{props.recipe.title}</h4>
            <div className="recipe-body margin-bottom-triple">
                <p className="margin-bottom">
                    {props.recipe.description}
                </p>
                <i className="fa fa-flask margin-right-half" />
                <h5 className="inline v-b">Ingredients</h5>
                {mapIngredients()}
                <i className="fa fa-list-ol margin-right-half" />
                <h5 className="inline v-b">Step by step</h5>
                {mapSteps()}
            </div>
            <div className="recipe-footer">
                <span>
                    <i className="fa fa-globe-americas margin-right-half" />
                    <a href={props.recipe.source.link} target="_blank" rel="noreferrer noopener">
                        {props.recipe.source.text}
                    </a>
                </span>
                <span className="pull-right">
                    <i className="fa fa-tags margin-right-half" />
                    {mapTags()}
                </span>
            </div>
        </div>
    );
};

Recipe.propTypes = {
    recipe: PropTypes.object,
};

Recipe.defaultProps = {
    recipe: [],
};

export default Recipe;
