const z = require('zod')

const Product = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  rating: z.object({
    rate: z.number(),
    count: z.number()
  })
})

module.exports = Product