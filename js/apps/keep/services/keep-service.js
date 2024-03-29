'use strict'


import utilService from '../../services/utils-service.js'


export const keepService = {
    keepQuery,
    getKeeps,
    createKeep,
    removeKeep,
    updateKeep,
    togglePin

}
const KEEPS_KEY = 'keepsKey'

function createKeep(type, content) {
    if (type === 'keepTodo') {
        let todos = content.split(',')
        let fullTodos = todos.map(todo => ({txt: todo, isActive: false, id: makeId()}))
        content = fullTodos
    }
    let newKeep = {
        id: makeId(),
        isPinned: false,
        type,
        content,
        color: utilService.getRandomColor(true)
    };
    // console.log('newKeep', newKeep);
    gKeeps.unshift(newKeep);
    // console.log('gkeeps', gKeeps);
    utilService.store(KEEPS_KEY, gKeeps)
}

function togglePin(id){
    let currPin = gKeeps.find(keep => keep.id === id)
    let currPinIdx = gKeeps.findIndex(keep => keep.id === id);
    currPin.isPinned = !currPin.isPinned;
    if(currPin.isPinned){
        currPin.pinnedFrom = currPinIdx;
        gKeeps.splice(currPinIdx, 1);
        gKeeps.unshift(currPin);
    }else{
        gKeeps.splice(currPinIdx, 1);
        gKeeps.splice(currPin.pinnedFrom, 0, currPin);
        delete currPin.pinnedFrom
    }
    return Promise.resolve(gKeeps)
}

function getKeeps() {
    // console.log('gkkeps get keeps',gKeeps);

    return Promise.resolve(gKeeps);
}

function keepQuery() {
    let keeps = utilService.load(KEEPS_KEY)
    if (!keeps) {
        keeps = gKeeps
        utilService.store(KEEPS_KEY, keeps)
    }
    gKeeps = keeps
    return Promise.resolve(gKeeps)
}

function removeKeep(id) {
    let keepIdx = gKeeps.findIndex(keep => keep.id === id)
    gKeeps.splice(keepIdx, 1)
    utilService.store(KEEPS_KEY, gKeeps)
    return Promise.resolve(gKeeps)
}

function updateKeep(keepId, key, value) {
   
    let keep = gKeeps.find(keep => keep.id === keepId);
    keep.color =  key;
    utilService.store(KEEPS_KEY, gKeeps)
    return Promise.resolve(gKeeps)
}


let gKeeps = [
    {
        id: utilService.makeId(),
        type: 'keepTxt',
        content: 'Paul Van Haver (Dutch pronunciation: [ˈpɔːl vɑn ˈɦɑvər]; born 12 March 1985), better known by his stage name Stromae',
        isPinned: false,
        color: utilService.getRandomColor(true)

    },
    {
        id: utilService.makeId(),
        type: 'keepTxt',
        content: 'Life is a tough period',
        isPinned: false,
        color: utilService.getRandomColor(true)
    },
    {
        id: utilService.makeId(),
        type: 'keepTxt',
        content: 'This post covers some basic concepts in.....',
        isPinned: false,
        color: utilService.getRandomColor(true)
    },
    {
        id: utilService.makeId(),
        type: 'keepImg',
        content: 'https://i0.wp.com/psychedelic.support/wp-content/uploads/2019/03/CarlJung.jpg?fit=681%2C714&ssl=1',
                isPinned: false,
                color: utilService.getRandomColor(true)
            },
    {
        id: utilService.makeId(),
        type: 'keepTxt',
        content: 'UX Designers consider the Why, What and How of Product Use',
        isPinned: false,
        color: utilService.getRandomColor(true)
    },
    {
        id: utilService.makeId(),
        type: 'keepTodo',
        content: [
            {
                id: utilService.makeId(),
                txt: 'Perform car service',
                isActive: 'false'
            },
            {
                id: utilService.makeId(),
                txt: 'Check library open hours',
                isActive: true,
                
            },
            {
                id: utilService.makeId(),
                txt: 'Pay the rent',
                isActive: true,
                
            },
            {
                id: utilService.makeId(),
                txt: 'Order tickets to show',
                isActive: true,
                
            },
        ],
        isPinned: false,
        color: utilService.getRandomColor(true)
        
    },
            {
                id: utilService.makeId(),
                type: 'keepVid',
                content: 'https://www.youtube.com/watch?v=EuPSibuIKIg',
                isPinned: false,
                color: utilService.getRandomColor(true)
            },
            {
                id: utilService.makeId(),
                type: 'keepVid',
                content: 'https://www.youtube.com/watch?v=dTL8HZmEadk',
                isPinned: false,
                color: utilService.getRandomColor(true)
            },
            {
                id: utilService.makeId(),
                type: 'keepImg',
                content: 'https://pocket-image-cache.com//filters:no_upscale()/https%3A%2F%2Fmiro.medium.com%2Fmax%2F3200%2F1*i8-u-V8LTTbQwTeUwLI_BQ.gif',
                isPinned: false,
                color: utilService.getRandomColor(true)
            },
            {
                id: utilService.makeId(),
                type: 'keepImg',
                content: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTVM3DTwmO6ucCXUvg-ChPJRXM52LCqnNZ7_C6jzlOJ0mqkQ8pTw&s',
                isPinned: false,
                color: utilService.getRandomColor(true)
            },
            {
                id: utilService.makeId(),
                type: 'keepVid',
                content: 'https://www.youtube.com/watch?v=EuPSibuIKIg',
                isPinned: false,
                color: utilService.getRandomColor(true)
            },
            {
                id: utilService.makeId(),
                type: 'keepTxt',
                content: 'When first learning to code, it’s easy to feel like a deer in the headlights; everything is unfamiliar and new. Its like learning to play a new instrument or a foreign language—what is this and what the heck am I doing?',
                isPinned: false,
                color: utilService.getRandomColor(true)
            },
        ]
        
        
function makeId(length = 4) {
    var text = '';
    var possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}



console.log(gKeeps)