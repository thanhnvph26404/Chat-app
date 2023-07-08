import './Posts.css'

import Post from '../Post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getTimeLinePosts } from '../../actions/postAction'
import { useParams } from 'react-router-dom'

const Posts = () => {
  const params  = useParams()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.authReducer.authData)
  let { posts, loading } = useSelector((state) => state.postReducer);
 
  useEffect(() => {
    console.log(posts);
    console.log(user._id);
    dispatch(getTimeLinePosts(user._id))
  }, [])
  if (!posts) return 'no posts'
  if(params.id) posts = posts.filter((post) => post.userId === params.id)
  return (
    <div className="Posts">
      {loading
        ? 'Fetching Posts...'
        :   
      posts?.map((post, id)=>{
            return <Post key={id} data={post} id={id}/>
        })
    }
    </div>
  )
}

export default Posts