declare module 'rename-vue-files-plugin' {
    interface RenameVueFilesPluginOptions {
        srcDir: string;
    }

    function renameVueFilesPlugin(options: RenameVueFilesPluginOptions): void;

    export = renameVueFilesPlugin;
}