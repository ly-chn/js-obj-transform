const serverObj = {
    username: '张三',
    userAage: 18,
    info: {
        score: [{
            type: 'chinese',
            score: 81
        }, {
            type: 'english',
            score: 62
        }, {
            type: 'math',
            score: 91
        }]
    }
}

const fontObj = {
    name: '张三',
    age: 18,
    score: [{
        subject: 'chinese',
        score: 81
    }, {
        subject: 'english',
        score: 62
    }, {
        subject: 'math',
        score: 91
    }]
}

/**
 * @typedef {KeyMap[0]} 目标路径
 */
type KeyMap = [sourcePath: string, targetPath: string, transform: Function, filterNon?: boolean]

type PathMap = {
    sourcePath: string
    targetPath: string
    arrKey: {}
}

// todo: 先明确获取值的格式
const map = {
    k1: {
        1: {
            k2: {
                1: null
            }
        }
    }
}


const keyMap: KeyMap[] = [
    ['username', 'basic.name', String],
    ['userAage', 'basic.age', String]
    // ['info.score[k1].type', 'score[k1].subject', Number],
    // ['info.score[k1].score', 'score[k1].score', Number]
]

class Transform {
    private static arrKeyRegex = /\[[a-zA-Z0-9]+]/g
    private static splitIndexRegex = /[\[\]]/

    static transformNotSupportArray(source: Record<string, any>, keyMap: KeyMap[]) {
        const result = {}
        for (const [sourcePath, targetPath, transform, filterNon] of keyMap) {
            const sourceValue = this.getValue(source, sourcePath)
            if ([null]) {

            } else {
                this.setValue(result, targetPath, transform(sourceValue))
            }
        }
        return result
    }

    private static getValueWithPath(obj: Record<string, any>, sourcePath: string, targetPath: string)
        : { path: string, value: any, k?: any }[] | void {
        if (!sourcePath.includes('[')) {
            return [{
                path: sourcePath,
                value: obj[sourcePath]
            }]
        }
        const sourcePathArr = sourcePath.split('.')
        const arrKeys = sourcePath.match(this.arrKeyRegex)!
        let result = obj
        for (let arrKey of arrKeys) {

        }
    }

    private static getValueLength(obj: Record<string, any>, path: string) {
        return this.getValue(obj, path)?.length || 0
    }

    private static getValue(obj: Record<string, any>, path: string): any {
        let result = obj
        for (const subPath of path.split('.')) {
            if (!obj) {
                return obj
            }
            if (subPath.includes('[')) {
                const [key, index] = subPath.split(this.splitIndexRegex)
                result = result[key][index]
            } else {
                result = result[subPath]
            }
        }
        return result
    }

    private static setValue(obj: Record<string, any>, path: string, value: any) {
        let current = obj
        const subPathList = path.split('.')
        for (let i = 0; i < subPathList.length; i++) {
            const subPath = subPathList[i]
            const [key, ...indexList] = subPath.split(/[\[\]]/).filter(it => it)
            const isLast = i === subPathList.length - 1
            if (subPath.includes('[')) {
                current[key] = current[key] ?? []
                current = current[key]
                for (let j = 0; j < indexList.length; j++) {
                    if (isLast && j === indexList.length - 1) {
                        current[indexList[j]] = value
                    } else {
                        current = current[indexList[j]] = j === indexList.length - 1 ? {} : []
                    }
                }
            } else {
                current = current[subPath] = isLast ? value : current[subPath] || {}
            }
        }
    }
}

// console.log(Transform.transformNotSupportArray(serverObj, keyMap))


function getValueWithPath(obj: Record<string, any>, sourcePath: string, targetPath: string)
    : { path: string, value: any, k?: any }[] | void {
    if (!sourcePath.includes('[')) {
        return [{
            path: sourcePath,
            value: obj[sourcePath]
        }]
    }
    const sourcePathArr = sourcePath.split('.')
    const arrKeys = sourcePath.match(/\[[a-zA-Z0-9]+]/g)!
    let result = obj
    for (let arrKey of arrKeys) {
        console.log(arrKeys)
    }
}
function setValue(obj: Record<string, any>, path: string, value: any) {
    let current = obj
    const subPathList = path.split('.')
    for (let i = 0; i < subPathList.length; i++) {
        const subPath = subPathList[i]
        const [key, ...indexList] = subPath.split(/[\[\]]/).filter(it => it)
        const isLast = i === subPathList.length - 1
        if (subPath.includes('[')) {
            current[key] = current[key] ?? []
            current = current[key]
            for (let j = 0; j < indexList.length; j++) {
                if (isLast && j === indexList.length - 1) {
                    current[indexList[j]] = value
                } else {
                    current = current[indexList[j]] = j === indexList.length - 1 ? {} : []
                }
            }
        } else {
            current = current[subPath] = isLast ? value : current[subPath] || {}
        }
        //
    }
}
// console.log(getValueWithPath(serverObj, 'info.score[k1].type', ''))
const obj = {}
setValue(obj, 'a[0][0].b[0].c[0]', '你好')
console.log(JSON.stringify(obj, null, 4))