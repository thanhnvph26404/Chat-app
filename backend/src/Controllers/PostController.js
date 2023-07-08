
import PostModel from "../Models/postModel";
import mongoose from "mongoose";
import UserModel from "../Models/userModel";

export const createPost = async (req, res) => { 
    const newPost = new PostModel(req.body)

    try {
        await newPost.save()
        res.status(200).json(newPost)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getPost = async (req, res) => {
    const id = req.params.id

    try {
        const post = await PostModel.findById(id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
}
 

export const updatePost = async (req, res) => { 
    const postId = req.params.id
    const { userId } = req.body
    
    try {
        const post = await PostModel.findById(postId)
        if (post.userId === userId) {
            await post.updateOne({ $set: request.body })
            res.status(200).json('Post Updated')
        } else { 
            res.status(403).json('Action')
        }
    } catch (error) {
        res.status(500).json(error)
        
    }
}


export const deletePost = async (req, res) => { 
    const id = req.params.id
    const { userId } = req.body
    
    try {
        
        const post = await PostModel.findById(id)
        if (post.userId === userId) {
            await post.deleteOne()
            res.status(200).json('Post deleted successfully')
        } else { 
            res.status(403).json('action forbidden')
        }
    } catch (error) {
        res.status(500).json(error)
        
    }
}

export const likePost = async (req, res) => {
    const id = req.params.id
  const { userId } = req.body
  try {
    const post = await PostModel.findById(id)
    if (post.likes.includes(userId)) {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post disliked")
    } else {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post liked")
    }
  } catch (error) {
    res.status(500).json(error)
  }
}
export const getTimelinePosts = async (req, res) => {
    const userId = req.params.id;
  
    try {
        const currentUserPosts = await PostModel.find({ userId: userId });
        // aggregate: thực hiện nhiều truy vấn phức tạp
      const followingPosts = await UserModel.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: "posts", /** liên kết với post trong db */
            localField: "following", /** liên kết field 'following' trong model*/
            foreignField: "userId", /** liên kết field 'userId' trong model Post với 'following' trong localField*/
            as: "followingPosts", /** set name*/
          },
        },
        {
          $project: {/* chọn các trường cần thiết(following) và loại bỏ trường _id khỏi kết quả server return*/
            followingPosts: 1,
            _id: 0,
          },
        },
      ]);
  
      res
        .status(200)
        .json(currentUserPosts.concat(...followingPosts[0].followingPosts)
        .sort((a,b)=>{
            return b.createdAt - a.createdAt;
        })
        );
    } catch (error) {
      res.status(500).json(error);
    }
  };