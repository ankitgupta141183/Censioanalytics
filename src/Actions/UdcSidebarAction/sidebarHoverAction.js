

export const trueSidebarHoverAction  = (payload) =>{
    return{
        type:'TRUE_MOUSE_HOVER_SIDBAR',
        payload:payload
    }
}

export const falseSidebarHoverAction  = (payload) =>{
    return{
        type:'FALSE_MOUSE_HOVER_SIDBAR',
        payload:payload
    }
}