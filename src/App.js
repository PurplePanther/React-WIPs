//import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import Recipes from './recipes';
//import { getSuggestedQuery } from '@testing-library/dom';

function App() {

  //so what am Ia search with this thing?
  //https://api.spoonacular.com/recipes/{id}/information get info about a recipe

  const [recipes,setRecipes] = useState([]); //stores the fetched recipes
  const [recipeNumber,setRecipeNumber]=useState(1); //Number of recipes to show; show one recipe by default
  const [query,setQuery] = useState(0);
  const API_KEY = '8e34e8e51580484485b5013befbe892e';
  const [wrongInput, setwrongInput] = useState(''); //message for incorrect input
  //const API_KEY = process.env.REACT_APP_API_KEY; //why isn't this working? :(
  //const[error,setError]=useState('');
  const [food, setFood] = useState('');

  /*const [choices,setChoices]=useState({
        food:'';
        number:1;
  })*/

  //`https://api.spoonacular.com/food/search?apiKey=${apiKey}&query=apple&number=2`;
  //search food
  //`https://api.spoonacular.com/recipes/complexSearch/?apiKey=${apiKey}&cuisine=italian&number=5`

  //console.log(process.env.REACT_API_KEY);

  useEffect(()=>{
    getRecipes();
  },[query]);

  //Fetch the recipes from the API
  //try{
    const getRecipes = async() => {
      const response = await fetch(`https://api.spoonacular.com/food/search?apiKey=${API_KEY}&query=banana&number=${recipeNumber}`)
      const data = await response.json();
      console.log(data.searchResults);
      console.log(data.searchResults[0].results);
      setRecipes(data.searchResults[0].results);
      //console.log(data.searchResults.length);

    }
    
  //}
  /*catch(err){
    setError(err);
  }*/

  //FOR TESTING PURPOSES
  /*const choiceHandler = e =>{
    //setChoices(
      //[e.target.name]:e.target.value;
    //)  
  }*/

  //This retrieves the number of wanted searches from the input box
  const chooseNumber = e => {
    setRecipeNumber(e.target.value);
    console.log(recipeNumber);
  }  

  const sendNumber = e=>{
    e.preventDefault();

    //Be sure the input box isn't empty before searching 
    if(!recipeNumber)
    {
      setwrongInput('Please enter the number of recipes you want to see');
    }
    else{
      /*query has to be set because just using the value of e.target.value will 
      make a fetch every time a new letter is added to the input box*/
      setQuery(recipeNumber); 
      setwrongInput('');
    }
  }

//get e.target.value from number input
//setNumber to that
//&number=${number}

  return (
    <div className='App'>
    
      <div>
        <form className='search-form' onSubmit={sendNumber}>

          <div className='searches'>
            <label>Food type: </label>
            <input type='text' name='food' className='search-bar' placeholder='Search by food'/>
            <button className='search-button'>Search</button>
          </div>
          
        <div className='searches'>
          <label>Recipe #: </label>
          <input type='text' name='number' className='search-bar' value={recipeNumber} onChange={chooseNumber} />
          <button className='number-search-button'>Search</button>
        </div>
          
        </form>
      </div>

      <p>{wrongInput}</p>

      <div>
        {recipes.map(recipe=>(
          <Recipes title={recipe.name} image={recipe.image} link={recipe.link} key={recipe.name}/>
        ))}
      </div>
    </div>
  );
}

export default App;