import nodeFetch from '../utils/nodeFetch'

export async function getH5PageJson(params) {
  // /getH5PageJson为后端接口地址
  const res = await nodeFetch.get(`/getH5PageJson`, {params})
  return res.data
}
