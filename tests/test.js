import test from 'node:test' 
import assert from 'node:assert'


test('example test',()=>{
    //valor actual y lo que esperas
    assert.equal(1,0,"1 no e igual a 0")
})

test('example object test',()=>{
    //valor actual y lo que esperas
    assert.deepEqual({a:1}, {a:1}, 'Objects no es igual')
})


test('async example test',async ()=>{
    const number= await Promise.resolve(3)
    assert.equal(number,3,'number is not equal to 3')
})


test('try Array.findLast',async ()=>{
    const number= [2,4,6,7]
    const lastEven= number.findLast(n=> n%2 ===0)
    assert.equal(lastEven,6)
})
