import React from 'react';


function Recipes({title, image, link})
{
    return(
        <div className='recipeCollection'>
            <h2>{title}</h2>
            <img src={image} className='image' alt=''/>
            <a href={link} className="link">Go to Recipe</a>
        </div>
    )
}
export default Recipes;