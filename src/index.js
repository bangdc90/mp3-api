import { Router } from 'itty-router'
import axios from 'axios'

const router = Router()

// Ví dụ route gốc
router.get('/', () => {
  return new Response(JSON.stringify({ status: 'ok', service: 'mp3-api' }), {
    headers: { 'Content-Type': 'application/json' }
  })
})

// Ví dụ route lấy dữ liệu từ ZingMP3 API
router.get('/api/song/:id', async ({ params }) => {
  try {
    const res = await axios.get(`https://zingmp3.vn/api/song/${params.id}`)
    return new Response(JSON.stringify(res.data), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
})

// 404 handler
router.all('*', () => new Response('Not Found', { status: 404 }))

export default {
  fetch: (request, env, ctx) => router.handle(request, env, ctx)
}
