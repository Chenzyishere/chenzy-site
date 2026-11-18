---
title: leetCode1
date: 2026-04-09 13:20:00
description: LeetCode 题解摘录。
tags:
  - javascript
categories:
  - 前端知识库
  - JavaScript
featured: false
---

leetCode

```
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
let groupAnagrams = function(strs){
    const map = new Map();//创建一个map用来标准化键为key，存储对应的anagram数组。
    for(let str of strs){//用for of来遍历数组元素
        let array = Array.from(str);//从str中浅拷贝一个数据实例
        array.sort()//排序
        let key = array.join('');//将排序后的数组转换成字符串，作为哈希表的key，用于标识一组anagrams
        let list = map.get(key)?map.get(key):new Array();
        //检查map中是否已有该key对应的数组，如果有就取出它，如果没有就新建一个空数组。
        list.push(str);//就将这个str推到list里面
        map.set(key,list);//map新建键值对，key和list数组
    }
    return Array.from(map.values())//将Map中的所有值转换成一个普通数组并返回
}
```


