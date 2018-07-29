class Api::Newsfeed::CoinsController < ApiController
  def index
    if params[:q] && params[:q][:coinIDs]
      coin_ids = params[:q][:coinIDs]
    else
      coin_ids = Coin.order(:ranking).limit(20).pluck(:id)
    end
    coins = Coin.where(id: coin_ids).order(:ranking)
    respond_success index_serializer(coins)
  end

  def watchlist
    return unless current_user
    coins = current_user.watchlist.coins.order(:ranking)
    respond_success index_serializer(coins)
  end

  private

  def index_serializer(coins)
    coins.as_json(
      only: %i[id name image_url symbol slug price_usd],
      methods: %i[market_info]
    )
  end
end
