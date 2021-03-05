import React from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Emoji from 'react-emoji-render';
import Category from './Components/Category';
import Interest from './Components/Interest';
import SubInterest from './Components/SubInterest';

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

  render() {
    return (
      <div>
        {!this.state.landingPage ? (
          <div>
            <motion.h1 animate={{ scale: [0, 1] }}>Hill's Interests</motion.h1>
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
          <motion.div
            id="welcome"
            animate={{ scale: [0, 1.5, 1] }}
            transition={{ duration: 1 }}
            onClick={() => {
              this.setState({ landingPage: false });
              this.componentDidMount();
            }}
          >
            <motion.div whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.8 }}>
              <Emoji text=":crown::zap:" />
            </motion.div>
          </motion.div>
        )}
      </div>
    );
  }
}
