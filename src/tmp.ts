function tmp() {
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
        basic: {
            name: '张三',
            age: 18
        },
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
    const keyMap: KeyMap[] = [
        ['username', 'basic.name', String],
        ['userAage', 'basic.age', String],
        ['info.score[k1].type[k2]', 'score[k1].subject[k2]', Number],
        ['info.score[k1].score', 'score[k1].score', Number]
    ]

    // info.score[k1].type[k2]
    // score[k1].subject[k2]
    // a[k1].b.c => {a: [{b: {c: 1}}]}
    // a[k1].b[k1].c => {a: [{b: {c: 1}}]}

}
