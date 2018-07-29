import React from 'react'
import axios from 'axios'
import Immutable from 'immutable'
import _ from 'lodash'
import Icon from './Icon'

const WatchButton = ({
  isWatching,
  coin,
  updateUser,
  onWatch,
  hasText,
  user,
}) => {
  const hasTextClassNames = 'btn btn-xs btn-gray'
  /*
  const addCoinToWatchlist = (id) => {
    const url = `/api/user.json?q[watchCoin]=${id}`
    let watchlistAdditions = _.uniqBy(
      _.merge(this.state.watchlist, this.props.coins),
      (value) => value.get('symbol'),
    )

    axios
      .get(url)
      .then((data) => {
        const str = data.data.payload[0]
        if (this.props.coins.length) {
          let newMap = Immutable.Map(str)
          watchlistAdditions.push(newMap)
          watchlistAdditions = _.uniqBy(watchlistAdditions, (value) =>
            value.get('symbol'),
          )
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
*/

  if (isWatching(coin.id)) {
    return (
      <Icon
        name="star"
        solid
        className={`aqua ${hasText ? hasTextClassNames : ''}`}
        onClick={() => {
          //removeCoinFromWatchlist(coin.id)
          updateUser({ unwatchCoin: coin.id })
        }}
      >
        {hasText && 'Watching'}
      </Icon>
    )
  }
  return (
    <div className="div tooltipped">
      <Icon
        name="star"
        light
        className={`light-silver ${hasText ? hasTextClassNames : ''}`}
        onClick={() => {
          // TODO: Implement new onboarding signup flow.
          if (!user) return (window.location = '/login')
          if (onWatch) onWatch(coin)
          updateUser({ watchCoin: coin.id })
          //addCoinToWatchlist(coin.id)
        }}
      >
        {hasText && 'Watch'}
      </Icon>
    </div>
  )
}

export default WatchButton
