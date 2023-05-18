const initialState = {
    breakLength: 5,
    sessionLength: 25,
    label:'Session',
}
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'newBreakIncrement':
            if (state.breakLength < 60) {
                return {
                    ...state, breakLength: state.breakLength + 1
                }
            } else return state;
        case 'newBreakDecrement':
            if (state.breakLength > 1) {
                return {
                    ...state, breakLength: state.breakLength - 1
                }
            } else return state;
        case 'newSessionIncrement':
            if (state.sessionLength < 60) {
                return {
                    ...state, sessionLength: state.sessionLength + 1
                }
            } else return state;
        case 'newSessionDecrement':
            if (state.sessionLength> 1) {
                return {
                    ...state, sessionLength: state.sessionLength - 1
                }
            } else return state;
        case 'setLabel':
            return {
                ...state, label: state.label==='Session'?'Break':'Session'
            }
        case 'resetAll':
                return {
                    breakLength: 5,
                    sessionLength: 25,
                    label:'Session',
                }

        default:
            return state;
    }
}
export default rootReducer;
export const incrementBreakLength= ()=>{
    return {type:'newBreakIncrement'};
}
export const decrementBreakLength= ()=>{
    return {type:'newBreakDecrement'};
}
export const incrementSessionLength= ()=>{
    return {type:'newSessionIncrement'};
}
export const decrementSessionLength= ()=>{
    return {type:'newSessionDecrement'};
}
export const setSession=(data)=>{
    return {type:'setSession',payload:data}
}
export const setLabel=()=>{
    return {type:'setLabel'}
}
export const reset=()=>{
    return {type:'resetAll'}
}