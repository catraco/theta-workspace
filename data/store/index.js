import { configureStore } from '@reduxjs/toolkit'
import settings from './settings'
import workspace from './workspace'
import menu from './menu'
import aside from './aside'
import archive from './archive'
import popups from './popups'

const store = configureStore({

    reducer: {

        settings,
        archive,
        workspace,
        aside,
        menu,
        popups,

    }

})

export { store }