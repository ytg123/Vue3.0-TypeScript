#!/bin/bash

echo "build 生成生成环境代码"

rm -rf dist && npm run build

echo "上传代码到云主机"

cd dist && scp -i ~/.ssh/terry.pem -r * root@ip:/var/www 