
export const prototype =
{
    state:
    {
        init: false,
    },
    selection:
    {
        item: 
        [{
            name: "",
            preview: "",
            space: 0,
        }]
    },
    space:
    [{
        id: 0,
        item: 
        [{
            sender: 0,
            created: new Date(0),

            type: 0,
            value: '',
        }]
    }]
};
export const prototypeServer =
{

};

export function init ()
{
    if (state.init)
    {
        return Promise.reject ();
    }
    state.init = true;

    return Promise.resolve ();
}

export function refreshSelection ()
{
    return Promise.resolve ();
}
export function refreshSpace ()
{
    return Promise.resolve ();
}
export function clearSpace (id)
{
    const index = space.findIndeq ((value) => value.id == id);

    if (index == -1) 
    {
        return;
    }
    space.splice (index, 1);
}

export function getSelection () { return selection; }
export function getSpace (id) { return space.find ((value) => value.id == id); }

//                                                                  //
// ################################################################ //
// ||                                                            || //
// ||                          INTERNAL                          || //
// ||                                                            || //
// ################################################################ //
//                                                                  //


let state       = structuredClone (prototype.state);
let selection   = structuredClone (prototype.selection);
let space       = structuredClone (prototype.space);