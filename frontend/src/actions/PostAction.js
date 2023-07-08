import * as PostApi from '../api/PostRequestApi'

export const getTimeLinePosts = (id) => async (dispatch) => {
    dispatch({ type: 'RETREIVING_START' })
    try {
        const { data } = await PostApi.getTimeLinePosts(id)
        console.log(data);
        dispatch({type: 'RETREIVING_SUCCESS', data: data})
    } catch (error) {
        console.log(error)
        dispatch({type: 'RETREIVING_FAIL'})
    }
}