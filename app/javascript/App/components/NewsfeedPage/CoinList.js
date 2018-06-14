import React, { Component, Fragment } from 'react'
import CoinListHeader from './CoinListHeader'
import CoinListItem from './CoinListItem'
import LoadingIndicator from '../LoadingIndicator'
import coinSearchProvider from '../../containers/coinSearch'

class CoinList extends Component {
  setActiveCoin = (coin) =>
    this.props.setActiveEntity({
      type: 'coin',
      id: coin.get('id'),
      label: coin.get('name')
    })
  newCoinHandler = (coin) => {
    this.setActiveCoin(coin)
    this.props.toggleUI('coinSearch')
    this.props.clearSearch()
  }
  render() {
    const { isLoading, currentUI, isWatching, searchedCoins } = this.props
    let { coins } = this.props
    if (currentUI('watchingOnly')) {
      coins = coins.filter((coin) => isWatching(coin.get('id')))
    }
    return (
      <Fragment>
        <CoinListHeader {...this.props} />
        <div className="flex-auto relative overflow-y-auto">
          {isLoading('coins') && (
            <LoadingIndicator className="overlay bg-white-70" />
          )}
          {currentUI('coinSearch') &&
            searchedCoins.size > 0 && (
              <div className="bb bw2 b--light-gray">
                {searchedCoins.map((coin, key) => (
                  <CoinListItem
                    {...{ coin, key, ...this.props }}
                    onClick={this.newCoinHandler}
                    onWatch={this.newCoinHandler}
                  />
                ))}
              </div>
            )}
          {coins.map((coin, index) => (
            <CoinListItem
              key={index}
              coin={coin}
              {...this.props}
              onClick={this.setActiveCoin}
            />
          ))}
        </div>
      </Fragment>
    )
  }
}

export default coinSearchProvider('newsfeed')(CoinList)
