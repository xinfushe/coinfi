import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import CoinListItem from './CoinListItem'
import SectionHeader from '../SectionHeader'
import Tabs from '../Tabs'
import watchlistStarIcon from '../../images/watch-list-star-icon.svg'

const mapStateToProps = (state) => ({
  watchlistCoins: state.watchlistCoins,
})

class CoinList extends Component {
  setActiveCoin = (coin) => {
    const { setActiveEntity, setFilter, disableUI, enableUI } = this.props
    setActiveEntity({
      type: 'coin',
      id: coin.id,
      label: coin.name,
    })
    const value = [coin.name]
    setFilter({ key: 'coins', value })
    if (!window.isDesktop) disableUI('coinListDrawer')
    if (window.isMobile) enableUI('bodySectionDrawer', { fullScreen: true })
  }

  render() {
    const { user, toplistCoins, watchlistCoins } = this.props
    return (
      <Fragment>
        <SectionHeader>
          <Tabs
            target="coin-list"
            items={['Top 20', 'Watchlist']}
            className="flex-auto justify-center justify-start-l"
          />
        </SectionHeader>

        <div
          id="coin-list"
          className="flex-auto relative overflow-y-auto coin-watch-list"
          style={watchlistStarIcon && { textAlign: 'center' }}
        >
          <div
            id="top20-coin-list"
            className={`tab-content ${user ? '' : 'active'}`}
          >
            {toplistCoins.map((coin, index) => (
              <CoinListItem
                key={index}
                coin={coin}
                {...this.props}
                onClick={this.setActiveCoin}
              />
            ))}
          </div>
          <div
            id="watchlist-coin-list"
            className={`tab-content ${user ? 'active' : ''}`}
          >
            {watchlistCoins &&
              watchlistCoins.map((coin, index) => (
                <CoinListItem
                  key={index}
                  coin={coin}
                  {...this.props}
                  onClick={this.setActiveCoin}
                />
              ))}
          </div>
        </div>
      </Fragment>
    )
  }
}

export default connect(mapStateToProps)(CoinList)
