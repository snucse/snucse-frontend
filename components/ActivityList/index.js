import React from 'react';
import {connect} from 'react-redux';

import {loadActivity} from '../../actions/dispatchers';
import ActivityFilter from './ActivityFilter';
import ActivityList from './ActivityList';
import ActivityPageNavigation from './ActivityPageNavigation';

const asdf = React.createClass({

  propTypes: {
    query: React.PropTypes.object
  },

  render() {
    const {query} = this.props;
    return (
      <div>
        <ActivityFilter query={query}/>
        <ActivityList
          loadActivity={this.props.loadActivity}
          activities={this.props.activities}
          loading={this.props.loading}
          isError={this.props.isError}
          query={query}
          />
        <ActivityPageNavigation
          count={this.props.count}
          query={query}
          />
      </div>
    );
  }
});

const mapStateToProps = function (state) {
  return {
    count: state.activity.count,
    activities: state.activity.activities,
    loading: state.activity.loading,
    isError: state.activity.isError
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    loadActivity: options => loadActivity(dispatch, options)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(asdf);