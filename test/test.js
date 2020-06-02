const assert = require('assert')
const { timestampToDate, objToUrlParam, formatVisits } = require('../src/utils')

describe('src/utils/index.js', () => {
    describe('timestampToDate()', () => {
        it('如果是时间戳，转化成日期+时间的格式', () => {
            assert.equal(timestampToDate(1561271877014), '2019-6-23 14:37:57')
        })

        it('如果是日期+时间，直接返回', () => {
            assert.equal(timestampToDate('2019-6-23 14:37:57'), '2019-6-23 14:37:57')
        })

        it('空返回初始时间', () => {
            assert.equal(timestampToDate(), '1970-1-1 08:00:00')
        })
    })
})

describe('src/utils/index.js', () => {
    describe('objToUrlParam()', () => {
        it('将对象转化成URL参数', () => {
            const obj = {
                user: 'admin',
                password: 'admin'
            }

            assert.equal(objToUrlParam(obj), '?user=admin&password=admin')
        })

        it('空对象返回空字符串', () => {
            assert.equal(objToUrlParam(), '')
        })
    })
})

describe('src/utils/index.js', () => {
    describe('formatVisits()', () => {
        it('每隔三位加逗号', () => {
            assert.equal(formatVisits(19216855), '19,216,855')
        })

        it('空返回空', () => {
            assert.equal(formatVisits(), '')
        })
    })
})