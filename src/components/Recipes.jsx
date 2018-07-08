import React from 'react';
import { Link } from 'react-router-dom';

const Recipes = () => {
    return (
        <div className="recipes-page">
            <h2>All Recipes</h2>
            <hr />
            <div className="recipe-list-section">
                <h4>Household Recipes</h4>
                <ul>
                    <li>
                        <Link to="/" href="/">
                            All purpose kitchen and bathroom cleaner - rinse needed.
                        </Link>
                    </li>
                    <li>
                        <Link to="/" href="/">
                            Soap for dishes.
                        </Link>
                    </li>
                    <li>
                        <Link to="/" href="/">
                            Glass and window cleaner.
                        </Link>
                    </li>
                    <li>
                        <Link to="/" href="/">
                            Floor detergent.
                        </Link>
                    </li>
                    <li>
                        <Link to="/" href="/">
                            Antibacterial toilet cleaner.
                        </Link>
                    </li>
                    <li>
                        <Link to="/" href="/">
                            Laundry conditioner.
                        </Link>
                    </li>
                </ul>
            </div>
            <hr />
            <div className="recipe-list-section">
                <h4>Cosmetic Recipes</h4>
                <ul>
                    <li>
                        <Link to="/" href="/">
                            Night cream.
                        </Link>
                    </li>
                    <li>
                        <Link to="/" href="/">
                            Shampoo bar for dry hair.
                        </Link>
                    </li>
                    <li>
                        <Link to="/" href="/">
                            Deodorant and anti-perspirant.
                        </Link>
                    </li>
                    <li>
                        <Link to="/" href="/">
                            Eye-liner.
                        </Link>
                    </li>
                    <li>
                        <Link to="/" href="/">
                            BB cream.
                        </Link>
                    </li>
                    <li>
                        <Link to="/" href="/">
                            Foundation powder.
                        </Link>
                    </li>
                    <li>
                        <Link to="/" href="/">
                            Blush.
                        </Link>
                    </li>
                </ul>
            </div>
            <hr />
            <div className="recipe-list-section">
                <h4>Natural Remedies</h4>
                <ul>
                    <li>
                        <Link to="/" href="/">
                            Muscle and nerves relaxant (sciatica).
                        </Link>
                    </li>
                    <li>
                        <Link to="/" href="/">
                            Anti-migraine roll-on.
                        </Link>
                    </li>
                    <li>
                        <Link to="/" href="/">
                            Sleep easy and relaxing roll-on (Litsea).
                        </Link>
                    </li>
                    <li>
                        <Link to="/" href="/">
                            Sleep easy and relaxing roll-on (Mandarin).
                        </Link>
                    </li>
                </ul>
            </div>
            <hr />
        </div>
    );
};

export default Recipes;
