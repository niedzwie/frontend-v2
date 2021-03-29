import ObjectManager from '@/utils/objectManager'
import commons from './_common'

const items = new ObjectManager({
  name: 'items',
  api: {
    url: '/items'
  },
  transform: [
    (object) => {
      let filtered = object.filter(el => !el.hide)
      filtered = filtered.sort((a, b) => a.sortId - b.sortId)

      return filtered
    }
  ],
  validator: commons.defaultValidator,
  ttl: 1000 * 60 * 60 * 1, // 1 hour
  ajaxHooks: commons.defaultAjaxHooks
})

export default items
