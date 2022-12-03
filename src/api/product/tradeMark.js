import request from '@/utils/request'
// 获取品牌管理数据
// 获取品牌列表接口
export const reqTradeMarkLIist = (page, limit) => request({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'GET' })