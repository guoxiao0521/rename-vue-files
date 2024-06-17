import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
//@ts-ignore
import renameVueFilePlugin from '../src/index'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    build: {
        rollupOptions: {
            plugins: [
                {
                    name: 'rename-vue-files',
                    buildStart() {
                        renameVueFilePlugin({srcDir: 'src'})
                    }
                }
            ]
        }
    }
})
