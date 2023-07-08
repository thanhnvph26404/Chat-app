import { useSelector } from "react-redux";
import Cover from "../../assets/img/cover.jpg";
import Profile from "../../assets/img/profileImg.jpg";
import {Link } from 'react-router-dom'
import "./ProfileCard.css";

const ProfileCard = ({location}) => {

  const { user } = useSelector((state) => state.authReducer.authData)
  const serverPublic = 'http://localhost:8080/images/'
  const posts = useSelector((state) => state.postReducer.posts)

  const ProfilePage = false;
  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <div className="background">
          <img src={
              user.coverPicture
                ? serverPublic + user.coverPicture
                : serverPublic + "defaultCover.jpg"
            } alt="" />
        </div>
        <img src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : serverPublic + "defaultProfile.png"
          } alt="" />
      </div>

      <div className="ProfileName">
        <span>{user.firstname} { user.lastname}</span>
        <span>{user.worksAt ? user.worksAt: 'Write about your self'}
        </span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{ user.following.length}</span>
            <span>Followings</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{ user.followers.length}</span>
            <span>Followers</span>
          </div>

          {location === 'profilePage' && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{posts.filter((post) => post.userId === user._id).length }</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {location === 'profilePage' ? "" : <span><Link style={{textDecoration: 'none', color: 'inherit'}} to={`/profile/${user._id}`}>My Profile</Link></span>}
    </div>
  );
};

export default ProfileCard;