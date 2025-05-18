import Finder from './finder/Finder'

export default class Buildr {

    public constructor(private finder: Finder) {
    }

    public build(): { imports: string[]; names: string[] } {
        const files = this.finder.getFiles()

        const imports = files.map((file) => {
            return file.file
                ? `import ${file.file} from "${file.import}"`
                : `import "${file.import}"`
        })

        const names = files.map((file) => file.file)

        return {imports, names};
    }

}
