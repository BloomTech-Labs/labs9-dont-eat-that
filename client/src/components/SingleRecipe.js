import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Parser from 'html-react-parser';
import {
  Button,
  Rating,
  Table,
  Header,
  Segment,
  Image
} from 'semantic-ui-react';
import {
  getRecipe,
  deleteRecipe,
  getNutrition,
  removeNutrition,
  getUser,
  addRecipe,
  ratingChange
} from '../actions';
import { downloadRecipeToCSV } from '../components/util';

class SingleRecipe extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getRecipe(id);
    this.props.getUser();
  }

  getNutrition = () => {
    const { name, ingredients } = this.props.recipe;
    const ingrArr = ingredients.map(
      ingr =>
        `${ingr.quantity ? ingr.quantity : ''} ${ingr.unit ? ingr.unit : ''} ${
          ingr.name
        }`
    );
    this.props.getNutrition(name, ingrArr); // gets nutritional value of recipe from Edamam
  };

  deleteRecipe = () => {
    const id = this.props.match.params.id;
    this.props.deleteRecipe(id);
    this.props.history.push('/recipes');
  };

  copyRecipe = recipe => {
    this.props.addRecipe({
      name: recipe.name,
      description: recipe.description,
      firebaseid: localStorage.getItem('uid'),
      ingredients: recipe.ingredients
    });
  };

  ratingsFunc = recipe => {
    // gets all ratings for recipe
    if (!recipe.ratings[0]) {
      return 0;
    } else {
      const ratingArr = recipe.ratings.map(rating => rating.rating);
      const avgRating =
        ratingArr.reduce((acc, num) => acc + num, 0) / recipe.ratings.length;
      return Math.round(avgRating);
    }
  };

  rateFunc = (e, data, recipeid) => {
    // processes rating from user for recipe
    this.props.ratingChange(recipeid, data.rating);
  };

  componentWillUnmount() {
    this.props.removeNutrition(); // removes nutrition from state
  }

  displayRecipe = recipe => {
    return (
      <React.Fragment>
        <Header as="h1">{recipe.name}</Header>
        <div>
          <Rating
            icon="star"
            size="massive"
            rating={this.ratingsFunc(recipe)}
            onRate={(e, data) => this.rateFunc(e, data, recipe.id)}
            maxRating={5}
            disabled={!localStorage.getItem('uid')}
          />
          <Header as="h6">{this.props.recipe.ratings.length} review(s)</Header>
        </div>
        <br />
        {localStorage.getItem('uid') && (
          <Button
            onClick={() => {
              this.copyRecipe(recipe);
              this.props.history.push('/recipes');
            }}
          >
            Copy Recipe
          </Button>
        )}
        {recipe.user_id === this.props.user.id && (
          <Link to={`/recipes/edit/${this.props.match.params.id}`}>
            <Button color="green">Edit Recipe</Button>
          </Link>
        )}
        {recipe.user_id === this.props.user.id && (
          <Button color="red" onClick={this.deleteRecipe}>
            Delete Recipe
          </Button>
        )}
        <div style={{ width: '95%', marginLeft: '2.5%', marginTop: '15px' }}>
          <Header as="h3" attached="top" textAlign="left">
            Ingredients
          </Header>
          <Segment attached textAlign="left">
            <ul>
              {recipe.ingredients.map(ingr => (
                <li key={ingr.name}>{`${ingr.quantity} ${
                  ingr.unit ? ingr.unit : ''
                } ${ingr.name}`}</li>
              ))}
            </ul>
          </Segment>
        </div>
        <br />
        <div style={{ width: '95%', marginLeft: '2.5%' }}>
          <Header as="h3" attached="top" textAlign="left">
            Recipe Description
          </Header>
          <Segment attached textAlign="left">
            {Parser(recipe.description)}
          </Segment>
        </div>
        ;
      </React.Fragment>
    );
  };

  render() {
    const { recipe, nutrition } = this.props;
    if (recipe && !nutrition) {
      this.getNutrition();
      return (
        <div>
          {this.displayRecipe(recipe)}
          <Button
            color="blue"
            onClick={() => {
              downloadRecipeToCSV(recipe);
            }}
          >
            Download Recipe
          </Button>
        </div>
      );
    } else if (recipe && nutrition) {
      // copy of the above code except showing nutrition info when they're a subscriber
      return (
        <div>
          {this.displayRecipe(recipe)}
          <Table
            celled
            structured
            color="blue"
            style={{ width: '95%', marginLeft: '2.5%' }}
            inverted
          >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  <Header as="h3">Nutrition Facts</Header>
                  <Segment vertical>Servings: {nutrition.yield}</Segment>
                  <Segment vertical>Calories: {nutrition.calories}</Segment>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  Diet Labels:{' '}
                  {nutrition.dietLabels.map(label => label.toLowerCase() + ' ')}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  Health Labels:{' '}
                  {nutrition.healthLabels.map(
                    label => label.toLowerCase() + ' '
                  )}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  Carbohydrates:{' '}
                  {nutrition.totalNutrients.CHOCDF
                    ? `${Math.round(
                        nutrition.totalNutrients.CHOCDF.quantity * 10
                      ) / 10} ${nutrition.totalNutrients.CHOCDF.unit}`
                    : '0 g'}
                  {' | '}
                  {Math.round(nutrition.totalDaily.CHOCDF.quantity * 10) / 10}%
                  Daily Value
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  Protein:{' '}
                  {nutrition.totalNutrients.PROCNT
                    ? `${Math.round(
                        nutrition.totalNutrients.PROCNT.quantity * 10
                      ) / 10} ${nutrition.totalNutrients.PROCNT.unit}`
                    : '0 g'}
                  {' | '}
                  {Math.round(nutrition.totalDaily.PROCNT.quantity * 10) / 10}%
                  Daily Value
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  Fat:{' '}
                  {nutrition.totalNutrients.FAT
                    ? `${Math.round(
                        nutrition.totalNutrients.FAT.quantity * 10
                      ) / 10} ${nutrition.totalNutrients.FAT.unit}`
                    : '0 g'}
                  {' | '}
                  {Math.round(nutrition.totalDaily.FAT.quantity * 10) / 10}%
                  Daily Value
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Button
            color="blue"
            onClick={() => {
              downloadRecipeToCSV(recipe);
            }}
          >
            Download Recipe
          </Button>
        </div>
      );
    } else {
      return (
        <Segment loading>
          <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
        </Segment>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    recipe: state.recipesReducer.recipe,
    nutrition: state.nutritionReducer.nutrition,
    user: state.usersReducer.user,
    rating: state.recipesReducer.rating
  };
};

export default connect(
  mapStateToProps,
  {
    getRecipe,
    deleteRecipe,
    getNutrition,
    removeNutrition,
    getUser,
    addRecipe,
    ratingChange
  }
)(SingleRecipe);
