import React from 'react'
import PercentageChange from '../PercentageChange'
import WatchButton from '../WatchButton'

export default (props) => {
  const { coin, onClick, isActiveEntity, user } = props
  let klass = 'pa-default b--b flex items-center pointer'
  if (isActiveEntity({ type: 'coin', id: coin.id })) klass += ' bg-foam'

  const coinPrice = coin && coin.price && coin.price.usd
  let fixedCount = 0
  if (coinPrice) {
    const decimals = coinPrice.toString().split('.')[1]
    fixedCount = decimals.length > 3 ? 4 : decimals.length
  }
  const coinPriceFixed = parseFloat(coinPrice).toFixed(fixedCount)
  const percentChange = coin.change24h
  return (
    <div className={klass} style={{ minHeight: 57 }}>
      <div className="tooltipped">
        {!user && <div className="tooltip from-right">Login to watch</div>}
        <WatchButton {...props} />
      </div>
      <div
        onClick={() => onClick(coin)}
        className="flex-auto flex justify-between items-center"
      >
        <div className="b f5 pl2">{coin.symbol}</div>
        {coin.price && (
          <div className="right-align">
            {coinPrice && (
              <div>
                $<span>{coinPriceFixed}</span>
              </div>
            )}
            {!coinPrice && <div className="smaller3">UNLISTED</div>}
            {coinPrice && (
              <PercentageChange
                value={percentChange}
                className="smaller2 b db"
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
