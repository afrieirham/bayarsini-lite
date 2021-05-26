import axios from 'axios'

const fetcher = async (url, token) => {
  const { data } = await axios.get(url, { withCredentials: true, headers: { token } })
  return data
}

export default fetcher
