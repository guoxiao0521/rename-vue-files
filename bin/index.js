#!/usr/bin/env node
const renameVueFilesPlugin = require('../dist/index')

if (!process.argv[2]) {
    console.error('请传入路径参数')
    return
}
renameVueFilesPlugin({ srcDir: process.argv[2] })