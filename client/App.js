import React from 'react';
import axios from 'axios';
import Category from './Components/Category';
import Interest from './Components/Interest';
import SubInterest from './Components/SubInterest';
import WelcomePage from './Components/WelcomePage';
import Back from './Components/Back';
import Title from './Components/Title';

let resultInterests = [];

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      landingPage: true,
      categories: [],
      categoryId: 0,
      categoryDescription: '',
      interests: [],
      subInterests: [],
      selected: '',
    };
    this.getResultInterests = this.getResultInterests.bind(this);
    this.getResultSubInterests = this.getResultSubInterests.bind(this);
    this.welcomePageState = this.welcomePageState.bind(this);
    this.backButtonInterests = this.backButtonInterests.bind(this);
    this.backButtonSubInterests = this.backButtonSubInterests.bind(this);
  }

  async componentDidMount() {
    try {
      const categories = (await axios.get('/api/categories')).data;
      this.setState({ categories });
    } catch (error) {
      console.log(error);
      this.setState({ loading: `was not able to retrieve categories!` });
    }
  }

  async getResultInterests(categoryName) {
    try {
      resultInterests = (await axios.get(`/api/categories/${categoryName}`))
        .data;
      this.setState({
        interests: resultInterests,
        selected: categoryName,
        subInterests: [],
        categories: [],
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getResultSubInterests(interestName) {
    try {
      const resultSubInterests = (
        await axios.get(
          `/api/categories/${this.state.selected}/${interestName}`
        )
      ).data;
      if (resultSubInterests.length !== 0) {
        this.setState({
          subInterests: resultSubInterests,
          interests: [],
          categories: [],
        });
      } else {
        this.setState({
          subInterests: resultSubInterests,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  welcomePageState() {
    this.setState({ landingPage: false });
    this.componentDidMount();
  }
  backButtonInterests() {
    this.componentDidMount();
    this.setState({ interests: [], subInterests: [] });
  }
  async backButtonSubInterests() {
    resultInterests = (
      await axios.get(`/api/categories/${this.state.selected}`)
    ).data;
    this.setState({
      interests: resultInterests,
      subInterests: [],
    });
  }

  render() {
    return (
      <div>
        {!this.state.landingPage ? (
          <div>
            <Title />
            <div>
              <div id="categories">
                {this.state.categories.map((category) => (
                  <Category
                    key={category.id}
                    category={category}
                    getResultInterests={this.getResultInterests}
                  />
                ))}
                {this.state.categories.length === 0 &&
                this.state.interests.length !== 0 ? (
                  <Back backButtonFunc={this.backButtonInterests} />
                ) : this.state.categories.length === 0 &&
                  this.state.interests.length === 0 ? (
                  <Back backButtonFunc={this.backButtonSubInterests} />
                ) : null}
              </div>
              <div>
                <div>
                  {this.state.interests.map((interest) => (
                    <Interest
                      key={interest.id}
                      interest={interest}
                      getResultSubInterests={this.getResultSubInterests}
                    />
                  ))}
                </div>
              </div>
              <div>
                {this.state.subInterests.map((subInterest) => (
                  <SubInterest key={subInterest.id} subInterest={subInterest} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <WelcomePage welcomePageState={this.welcomePageState} />
        )}
      </div>
    );
  }
}
