import React, { Fragment } from "react"
import Icon from "../Icon"
import SectionHeader from "./SectionHeader"
import SectionHeaderTight from "./SectionHeaderTight"
import SearchCoins from "./SearchCoins"
import FilterPanel from "../FilterPanel"
import FilterTags from "../FilterTags"
import bulbIcon from "../../images/bulbIcon.svg"
import filterBtn from "../../images/filter-btn.svg"

const NewsListHeader = (props) => {
  const {
    enableUI,
    currentUI,
    coins,
    feedSources,
    activeFilters,
    newsfeedTips
  } = props
  const toggleFilters = () =>
    enableUI("filterPanel", { fullScreen: window.isMobile })

  const btnStyle = {
    padding: "18px",
    borderRadius: 0
  }

  return (
    <Fragment>
      {window.isMobile && (
        <SectionHeaderTight>
          <div className="flex-auto flex items-center">
            <Fragment>
              <button
                className="btn btn-blue btn-xs"
                onClick={() => enableUI("coinListDrawer", { fullScreen: true })}
                style={{
                  ...btnStyle,
                  ...{
                    background: "#2495ce",
                    flex: 1,
                    textTransform: "none",
                    fontSize: 14
                  }
                }}
              >
                <Icon name="list" className="mr2" />
                <span>Coins</span>
              </button>
              <button
                className="btn btn-blue btn-xs flex-auto"
                style={{
                  ...btnStyle,
                  ...{
                    flex: 1,
                    fontSize: 14,
                    textTransform: "none",
                    padding: 19
                  }
                }}
                onClick={newsfeedTips}
              >
                <img style={{ height: 10 }} src={bulbIcon} />
                <span style={{ marginLeft: 5 }}>Tips</span>
              </button>
            </Fragment>
          </div>
        </SectionHeaderTight>
      )}
      <SectionHeader>
        <div className="flex items-center flex-auto">
          {!window.isMobile && (
            <button
              className="btn btn-blue btn-xs coins-btn mr2"
              onClick={() => enableUI("coinListDrawer", { fullScreen: true })}
              style={
                window.isMobile
                  ? {
                      ...btnStyle,
                      ...{
                        background: "#2495ce",
                        flex: 1,
                        textTransform: "none"
                      }
                    }
                  : {}
              }
            >
              <Icon name="list" className="mr2" />
              <span>Coins</span>
            </button>
          )}
          <SearchCoins {...props} />
          <button
            onClick={toggleFilters}
            className="btn btn-xs btn-white filter-btn ml2"
          >
            <img style={{ height: 10, marginRight: 10 }} src={filterBtn} />
            Filters
          </button>
        </div>
      </SectionHeader>
      {activeFilters.size > 0 && (
        <div className="pa3 f6 b--b bg-athens flex items-center">
          <span className="mr2">Viewing by:</span>
          <FilterTags {...props} />
        </div>
      )}
      {currentUI("filterPanel") && (
        <FilterPanel {...props} filterData={{ coins, feedSources }} />
      )}
    </Fragment>
  )
}

export default NewsListHeader