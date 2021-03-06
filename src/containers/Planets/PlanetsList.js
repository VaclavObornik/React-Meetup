import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { PlanetsListItem } from 'components'
import { load } from 'redux/modules/planets'

@connect(
  state => ({
    planets: state.planets
  }),
  { load }
)
export default class PlanetsList extends Component {
  static propTypes = {
    load: PropTypes.func.isRequired,
    planets: PropTypes.object.isRequired
  }

  componentDidMount() {
    if (!this.props.planets.loaded) {
      this.props.load()
    }
  }

  render() {
    const {
      loading,
      data
    } = this.props.planets

    if (loading) {
      return <div>Loading ... </div>
    }

    if (data && !data.error && !loading) {
      return (
        <ul>
          {data.results.map((item, key) => <PlanetsListItem key={key} {...item} />)}
          <PlanetsListItem name="Earth" url="http://swapi.co/api/planets/100/" />
        </ul>
      )
    }

    return <div />
  }
}
