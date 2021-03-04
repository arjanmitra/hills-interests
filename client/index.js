import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import Emoji from 'react-emoji-render';

let resultInterests = [];

class App extends React.Component {
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

  render() {
    return (
      <div>
        {!this.state.landingPage ? (
          <div>
            <motion.h1 animate={{ scale: [0, 1] }}>Hill's Interests</motion.h1>
            <div>
              <div id="categories">
                {this.state.categories.map((category) => (
                  <motion.div
                    id="category"
                    key={category.id}
                    animate={{ scale: [0, 1] }}
                  >
                    <motion.h1
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      key={category.id}
                      onClick={() => this.getResultInterests(category.name)}
                    >
                      <Emoji text={category.name} />
                    </motion.h1>
                    <p>
                      <Emoji text={category.description} />
                    </p>
                  </motion.div>
                ))}
                {this.state.categories.length === 0 &&
                this.state.interests.length !== 0 ? (
                  <motion.h2
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      this.componentDidMount();
                      this.setState({ interests: [], subInterests: [] });
                    }}
                  >
                    <Emoji text=":back:" />
                  </motion.h2>
                ) : this.state.categories.length === 0 &&
                  this.state.interests.length === 0 ? (
                  <motion.h2
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={async () => {
                      resultInterests = (
                        await axios.get(
                          `/api/categories/${this.state.selected}`
                        )
                      ).data;
                      console.log(resultInterests);
                      this.setState({
                        interests: resultInterests,
                        subInterests: [],
                      });
                    }}
                  >
                    <Emoji text=":back:" />
                  </motion.h2>
                ) : null}
              </div>
              <div>
                <div>
                  {this.state.interests.map((interest) => (
                    <motion.div
                      id="interest"
                      key={interest.id}
                      animate={{ scale: [0, 1] }}
                      onClick={async () => {
                        try {
                          const resultSubInterests = (
                            await axios.get(
                              `/api/categories/${this.state.selected}/${interest.name}`
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
                      }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <a href={interest.link}>
                          <h1>
                            <Emoji text={interest.name} />
                          </h1>
                        </a>
                        <p>{interest.description}</p>
                        <p>{interest.link}</p>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div>
                {this.state.subInterests.map((subInterest) => (
                  <motion.div key={subInterest.id} animate={{ scale: [0, 1] }}>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <a href={subInterest.link}>
                        <h1>{subInterest.name}</h1>
                      </a>
                      <p>{subInterest.description}</p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <motion.div
            id="welcome"
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.25, duration: 0.5 }}
            onClick={() => {
              this.setState({ landingPage: false });
              this.componentDidMount();
            }}
          >
            <Emoji text=":crown::zap:" />
          </motion.div>
        )}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
