import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: '',
      categories: [],
      categoryId: 0,
      categoryDescription: '',
      interests: [],
      subInterests: [],
      selected: '',
    };
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
  render() {
    return (
      <div>
        <div>{this.state.loading}</div>
        <h1>Hill's Interests</h1>
        <h3>
          Did you know that I'm terrible at keeping track of Hill's interests?
          So, I decided to build this app to keep track of them all!
        </h3>
        <div>
          <div id="categories">
            Categories:
            {this.state.categories.map((category) => (
              <div key={category.id}>
                <button
                  key={category.id}
                  onClick={async () => {
                    try {
                      const resultInterests = (
                        await axios.get(`/api/categories/${category.name}`)
                      ).data;
                      this.setState({
                        interests: resultInterests,
                        selected: category.name,
                        subInterests: [],
                      });
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                  onMouseEnter={() => {
                    this.setState({
                      categoryDescription: category.description,
                      categoryId: category.id,
                    });
                  }}
                  onMouseLeave={() => {
                    this.setState({ categoryDescription: '' });
                  }}
                >
                  {category.name}
                </button>
                <p>
                  {this.state.categoryId === category.id
                    ? this.state.categoryDescription
                    : null}
                </p>
              </div>
            ))}
          </div>
          <div>
            {this.state.interests.map((interest) => (
              <div
                key={interest.id}
                onClick={async () => {
                  try {
                    const resultSubInterests = (
                      await axios.get(
                        `/api/categories/${this.state.selected}/${interest.name}`
                      )
                    ).data;
                    this.setState({ subInterests: resultSubInterests });
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                {interest.name}
              </div>
            ))}
          </div>
          <div>
            {this.state.subInterests.map((subInterest) => (
              <div>{subInterest.name}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
