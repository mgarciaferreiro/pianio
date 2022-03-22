
// TODO: implement state

let state = null;

export function initState() {
    state = {};
}

export function processGameUpdate(update) {
    state = update;
}

export function getCurrentState() {
    return state;
}