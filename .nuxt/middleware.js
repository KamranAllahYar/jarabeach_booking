const middleware = {}

middleware['clear'] = require('../middleware/clear.js')
middleware['clear'] = middleware['clear'].default || middleware['clear']

export default middleware
