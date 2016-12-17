import React from 'react';
import {Link} from 'react-router';

const ProfileAdminContainer = React.createClass({
  render() {
    const {id, admin, mine} = this.props;
    if (!admin) {
      return null;
    }

    const adminLink = (mine === true) ? (
      <Link to={`/profiles/${id}/admin`}>관리자 변경</Link>
    ) : (
      null
    );

    return (
      <div className="profile-admin">
        관리자: {`${admin.name}(${admin.username})`}
        {adminLink}
      </div>
    );
  }
});

export default ProfileAdminContainer;