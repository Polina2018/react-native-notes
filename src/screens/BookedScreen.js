import React from 'react'
import { PostList } from '../components/PostList'
import { useSelector } from 'react-redux'

export const BookedScreen = ({navigation}) => {
  const openPostHandler = post => {
    navigation.navigate('Post', {postId: post.id, date: post.date, booked: post.booked})
  }

  const bookedPosts = useSelector(state => state.post.bookedPosts)
  return <PostList data={bookedPosts} onOpen={openPostHandler}/>
}


  