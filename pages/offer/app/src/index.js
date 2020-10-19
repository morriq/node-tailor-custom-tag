import('recommendations')
    .then(bootstrap => bootstrap());

import('header')
    .then(bootstrap => bootstrap());

if (module.hot) {
    module.hot.accept();
}
