
import './Post.css'
import Comment from '../../assets/img/comment.png'
import Share from '../../assets/img/share.png'
import Heart from '../../assets/img/like.png'
import NotLike from '../../assets/img/notlike.png'
import { useSelector } from 'react-redux'
import { useEffect, useState} from 'react'
import { likePost } from '../../api/PostRequestApi'


const Post = ({ data }) => {

  const { user } = useSelector((state) => state.authReducer.authData)
  
  const [liked, setLiked] = useState(data.likes.includes(user._id))
  const [likes, setLikes] = useState(data.likes.length)
  
  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked? setLikes((prev)=>prev-1): setLikes((prev)=>prev+1)
  };
  useEffect(() => {
    console.log(likes);
  },[likes])
  return (
    <>
    <div className="Post">
        <img src={data.image ? 'http://localhost:8080/images/' + data.image : ""} alt="" />


        <div className="postReact">
            <img src={liked ? Heart: NotLike} style={{cursor: 'pointer'}} onClick={handleLike} alt="" />
            <img src={Comment} alt="" />
            <img src={Share} alt="" />
        </div>


        <span style={{color: "var(--gray)", fontSize: '12px'}}>{likes} likes</span>

        <div className="detail">
            <span><b>{data.name}</b></span>
            <span> {data.desc}</span>
        </div>
    </div>
    
    </>
  )
}

export default Post