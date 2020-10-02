import React from 'react';

function Component(): JSX.Element {
    let a = {};

    if (typeof window !== 'undefined') {

        console.log(a.b.c);
    }
    return <div>header</div>;
}

export default Component;
