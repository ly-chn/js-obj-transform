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
            const targetValue = (sourceValue === null || sourceValue === undefined) ? sourceValue : transform(sourceValue)
            this.setValue(result, targetPath, targetValue)
        }
        return result
    }

    private static getValue(obj: Record<string, any>, path: string) {
        let result = obj
        for (const subPath of path.split('.')) {
            console.log(subPath)
            if (!obj) {
                return null
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
        const pathArr = path.split('.')
        let result = obj
        for (let i = 0; i < pathArr.length; i++) {
            const path = pathArr[i]
            if (path.includes('[')) {
                const [key, index] = path.split(/[\[\]]/)
                if (i === pathArr.length - 1) {
                    result[key][index] = value
                } else {
                    result = result[key][index]
                }
            } else {
                if (i === pathArr.length - 1) {
                    result[path] = value
                } else {
                    result = result[path]
                }
            }
        }
    }
}

function setValue(obj: Record<string, any>, path: string, value: any) {
    let temp = obj
    const subPathList = path.split('.')
    for (let i = 0; i < subPathList.length; i++) {
        console.log(JSON.stringify(temp))
        const subPath = subPathList[i]
        const [key, ...indexList] = subPath.split(/[\[\]]/)
        const isLast = i === subPathList.length - 1
        if (isLast) {
            console.log('set value', subPath, temp, value)
            if (subPath.includes('[')) {
                temp[key] = temp[key] || []
                // temp[key][index] = value
            } else {
                temp[subPath] = value
            }
            return
        }
        if (subPath.includes('[')) {
            temp[key] = temp[key] ?? []
            temp = temp[key]
            for (let j = 0; j < indexList.length; j++) {
                temp[indexList[j]] = j === indexList.length - 1 ? {} : []
                temp = temp[indexList[j]]
            }
        } else {
            temp[subPath] = temp[subPath] || {}
            temp = temp[subPath]
        }
    }

}

const obj = {}

setValue(obj, 'a.b[0][0].c', 1)

console.log(JSON.stringify(obj, null, 4))