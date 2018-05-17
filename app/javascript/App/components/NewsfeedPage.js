import React, { Component } from 'react'
import newsfeedContainer from '../containers/newsfeed'
import Coin from './NewsfeedCoin'
import ArticleList from './ArticleList'

class NewsfeedPage extends Component {
  render() {
    const { coins } = this.props
    return (
      <div className="container-wide ph4-l">
        <div className="bg-white">
          <div className="row no-gutter flex">
            <div className="col-xs-2">
              {coins &&
                coins.map((coin, index) => <Coin key={index} coin={coin} />)}
            </div>
            <div className="col-xs-5 bl b--light-gray">
              <ColumnHeader>
                <div>Search</div>
                <div>Filters</div>
              </ColumnHeader>
              <ArticleList {...this.props} />
            </div>
            <div className="col-xs-5 bl b--light-gray">
              <div className="pa4">Tips</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const ColumnHeader = ({ children }) => (
  <header className="bg-near-white bb b--light-gray f6 h3 ph3 flex items-center justify-between">
    {children}
  </header>
)

export default newsfeedContainer(NewsfeedPage)
