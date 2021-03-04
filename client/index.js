import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import Emoji from 'react-emoji-render';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
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
        <h1>Hill's Interests</h1>
        <div>
          <div id="categories">
            {this.state.categories.map((category) => (
              <motion.div
                id="category"
                key={category.id}
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.25, duration: 0.5 }}
              >
                <h1
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
                        categories: [],
                      });
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  <Emoji text={category.name} />
                </h1>
                <p>
                  <Emoji text={category.description} />
                </p>
              </motion.div>
            ))}
            {this.state.categories.length === 0 ? (
              <p
                onClick={() => {
                  this.componentDidMount();
                  this.setState({ interests: [], subInterests: [] });
                }}
              >
                back
              </p>
            ) : null}
          </div>
          <div>
            <div>
              {this.state.interests.map((interest) => (
                <div
                  id="interest"
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
                  <h4>{interest.name}</h4>
                  <p>{interest.description}</p>
                  <p>{interest.link}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            {this.state.subInterests.map((subInterest) => (
              <div key={subInterest.id}>
                <h5>{subInterest.name}</h5>
                <p>{subInterest.description}</p>
                <p>{subInterest.link}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
