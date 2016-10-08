import React from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {DataCon} from '../utils';
import {loadProfiles} from '../actions/profilesAction';
import ProfileMakeForm from './ProfileMakeForm';

const Profiles = React.createClass({
  loadProfilesFromServer() {
    DataCon.loadDataFromServer(this.props.route.url)
      .then(this.props.onProfilesLoad)
      .catch(console.error);
  },

  componentDidMount() {
    this.loadProfilesFromServer();
  },

  toProfiles(sid) {
    browserHistory.push('/' + sid);
  },

  render() {
    const profiles = this.props.data.profiles.map(profile => {
      return (
        <div key={profile.sid} className="profile">
          <strong
            onClick={function () {
              this.toProfiles(profile.sid);
            }}
            >
            {profile.name}
          </strong>
        </div>
      );
    });
    return (
      <div className="profile container">
        <ProfileMakeForm url={this.props.route.url}/>
        <div className="profiles">
          {profiles}
        </div>
      </div>
    );
  }
});

const mapStateToProps = function (state) {
  return {
    data: state.profileList.data
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    onProfilesLoad(data) {
      dispatch(loadProfiles(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
