/*
 * Selector creators which follow the normalizr pattern, eg.
 * 
 * globalState = {
 *   newsfeed: {
 *      articles: {
 *        entities: {
 *          articles: {},
 *          tags: {},
 *        },
 *        result: []
 *      }
 *   }
 * }
 */
import { createSelector } from 'reselect'

const selectState = (containerName) => (state) => {
  return state[containerName]
}

export const selectIDs = (containerName, entityType) => {
  return createSelector(selectState(containerName), (state) =>
    state.getIn(['ids', entityType])
  )
}

export const selectEntities = (containerName, entityType) => {
  return createSelector(selectState(containerName), (state) => {
    const ids = state.getIn(['ids', entityType])
    const entities = state.getIn(['entities', entityType])
    if (!ids || !entities) return null
    return ids.map((id) => entities.get(`${id}`))
  })
}

export const selectEntity = (containerName, entityType) =>
  createSelector(selectState(containerName), (state) => (id) =>
    state.getIn(['entities', entityType, `${id}`])
  )

export const selectEntityChildren = (containerName, entityType, childrenType) =>
  createSelector(selectState(containerName), (state) => (parent) => {
    return parent
      .get(childrenType)
      .map((childID) => state.getIn(['entities', childrenType, `${childID}`]))
  })
