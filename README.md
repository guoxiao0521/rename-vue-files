# rename-vue-files-plugin

一个用于将 `.vue` 文件重命名为大写驼峰命名并更新引用的 Vite 插件。

## 安装

使用 npm 安装：

```bash
npm install rename-vue-files-plugin --save-dev
```

或使用 yarn 安装：

```bash
yarn add rename-vue-files-plugin --dev
```

使用方法
在你的 `vite.config.ts` 文件中配置插件：

```typescript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import renameVueFilesPlugin from 'rename-vue-files-plugin';

export default defineConfig({
    plugins: [vue()],
    build: {
        rollupOptions: {
            plugins: [
                {
                    name: 'rename-vue-files',
                    buildStart() {
                        renameVueFilesPlugin({ srcDir: 'src' });
                    }
                }
            ]
        }
    }
});
```

配置选项
插件接受一个配置对象，包含以下属性：

`srcDir`：要处理的源目录路径。

```
my-project/
├── src/
│   ├── components/
│   │   ├── my-component.vue
│   │   └── another-component.vue
│   ├── main.js
│   └── ...
├── vite.config.ts
└── ...
```

在 `vite.config.ts` 中配置插件后，运行构建命令：
```bash
vite build
```
